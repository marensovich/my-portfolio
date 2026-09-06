import { useState, useEffect } from 'react'
import { GitBranch, Clock, GitCommitHorizontal } from 'lucide-react'

interface BranchStat {
  name: string
  commits: number
  lastCommit: string
}

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const m = url.match(/github\.com\/([^/]+)\/([^/?#]+)/)
  return m ? { owner: m[1], repo: m[2].replace(/\.git$/, '') } : null
}

function formatDate(iso: string): string {
  if (!iso) return '—'
  return new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso))
}

async function fetchBranchStat(owner: string, repo: string, branch: string): Promise<BranchStat | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?sha=${encodeURIComponent(branch)}&per_page=1`,
      { headers: { Accept: 'application/vnd.github+json' } }
    )
    if (!res.ok) return null

    const data = await res.json()
    const lastCommit: string =
      data[0]?.commit?.committer?.date ?? data[0]?.commit?.author?.date ?? ''

    const link = res.headers.get('Link') ?? ''
    const m = link.match(/[?&]page=(\d+)>;\s*rel="last"/)
    const commits = m ? parseInt(m[1]) : (data.length > 0 ? 1 : 0)

    return { name: branch, commits, lastCommit }
  } catch {
    return null
  }
}

interface Props {
  githubLink: string
}

export function RepoStats({ githubLink }: Props) {
  const [stats, setStats] = useState<BranchStat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const parsed = parseGitHubUrl(githubLink)
    if (!parsed) { setLoading(false); return }
    const { owner, repo } = parsed

    async function load() {
      try {
        const branchRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/branches?per_page=100`,
          { headers: { Accept: 'application/vnd.github+json' } }
        )
        if (!branchRes.ok) { setLoading(false); return }

        const branches: { name: string }[] = await branchRes.json()

        const results = await Promise.all(
          branches.map(b => fetchBranchStat(owner, repo, b.name))
        )

        setStats(
          results
            .filter((s): s is BranchStat => s !== null && s.commits > 0)
            .sort((a, b) => b.commits - a.commits)
        )
      } catch {
        // silent fail — stats are optional
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [githubLink])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-[var(--text-3)] animate-pulse">
        <GitBranch size={12} />
        Loading stats...
      </div>
    )
  }

  if (!stats.length) return null

  return (
    <div className="flex flex-col gap-2">
      {stats.map(s => (
        <div
          key={s.name}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border)] text-xs"
        >
          <GitBranch size={12} className="text-[var(--text-3)] shrink-0" />
          <code className="font-mono text-[var(--text-1)] font-medium">{s.name}</code>
          <span className="text-[var(--border-hover)]">·</span>
          <GitCommitHorizontal size={12} className="text-[var(--text-3)] shrink-0" />
          <span className="text-[var(--text-2)]">{s.commits.toLocaleString('en')} commits</span>
          <span className="text-[var(--border-hover)]">·</span>
          <Clock size={12} className="text-[var(--text-3)] shrink-0" />
          <span className="text-[var(--text-3)]">{formatDate(s.lastCommit)}</span>
        </div>
      ))}
    </div>
  )
}

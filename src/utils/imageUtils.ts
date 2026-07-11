const PALETTE: string[][] = [
  ['#FF6B9D', '#845EF7'],
  ['#22D3EE', '#0A84FF'],
  ['#F59E0B', '#EF4444'],
  ['#10B981', '#0A84FF'],
  ['#8B5CF6', '#EC4899'],
  ['#F97316', '#EAB308'],
]

export function getPlaceholderGradient(seed: string, index = 0): string {
  const hash = [...seed].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const [c1, c2] = PALETTE[(hash + index) % PALETTE.length]
  const angle = (hash * 37 + index * 60) % 360
  return `linear-gradient(${angle}deg, ${c1}99, ${c2}99)`
}


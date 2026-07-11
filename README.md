# marensovich

Личный сайт-портфолио. Vite + React 19 + TypeScript + Tailwind CSS v4.

## Стек

- **React 19** + **TypeScript**
- **Tailwind CSS v4** (через `@tailwindcss/vite`)
- **Framer Motion** — анимации модальных окон
- **react-icons** — брендовые иконки соцсетей
- **Lucide React** — UI-иконки

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist/
```

## Структура контента

Весь контент — в `public/content/`, пересборка не нужна.

```
public/content/
├── site.json          ← имя, bio, соцсети, стек, опыт, статистика
├── theme.json         ← цвета, тёмная тема
├── projects.json      ← список проектов (порядок = порядок в сетке)
└── projects/
    └── my-project/
        ├── config.json
        ├── cover.png
        └── main-1.jpg
```

Подробно — в [ADDING_PROJECTS.md](./ADDING_PROJECTS.md).

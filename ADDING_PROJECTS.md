# Как добавлять проекты и управлять сайтом

Весь контент — в папке `public/content/`. Никакой пересборки для добавления проектов не нужно.

---

## Структура файлов

```
public/content/
├── site.json              ← твои данные: имя, bio, соцсети, стек, опыт
├── theme.json             ← цвета, тёмная тема
├── projects.json          ← список слагов проектов (порядок = порядок в сетке)
└── projects/
    └── my-discord-bot/    ← папка = проект
        ├── config.json    ← описание проекта
        ├── cover.png      ← обложка (показывается в сетке)
        ├── main-1.jpg     ← главное фото 1
        ├── main-2.jpg     ← главное фото 2
        ├── main-3.jpg     ← главное фото 3
        └── gallery/       ← допфото (необязательно)
            └── extra-1.jpg
```

---

## Добавить новый проект (пошагово)

### 1. Создай папку

```bash
mkdir -p public/content/projects/my-project
```

Имя папки — **kebab-case**: `my-discord-bot`, `telegram-shop`, `minecraft-plugin`.

---

### 2. Создай `config.json`

```json
{
  "title": "Название проекта",
  "slug": "my-project",
  "year": 2025,
  "category": "Боты",
  "tags": ["python", "aiogram", "bot"],
  "description": "Что делает проект, зачем и как.\nМожно несколько строк — \n сохраняются как есть.",
  "cover": "cover.png",
  "mainPhotos": [
    "main-1.jpg",
    "main-2.jpg",
    "main-3.jpg"
  ],
  "githubLink": "https://github.com/marensovich/project",
  "externalLink": "https://example.com",
  "published": true,
  "order": 5
}
```

Поля `cover`, `mainPhotos`, `githubLink`, `externalLink`, `order` — необязательны.

---

### 3. Положи фото

```
public/content/projects/my-project/
  cover.png       ← превью в сетке
  main-1.jpg      ← фото в модальном окне (до 3 штук)
  main-2.jpg
  gallery/
    extra-1.jpg   ← скрытые под кнопкой «Ещё фото»
```

**Форматы:** `.jpg`, `.png`, `.webp` — любые. Без фото проект тоже отображается (показывается аббревиатура категории).

---

### 4. Добавь слаг в `projects.json`

Открой `public/content/projects.json` и вставь слаг в нужное место:

```json
[
  "github-gitlab-notifier",
  "my-project",
  "custom-rules-plugin",
  ...
]
```

Порядок в массиве = порядок карточек на сайте. Поле `order` в `config.json` используется как запасной вариант сортировки.

---

### 5. Обнови страницу

```bash
npm run dev   # если не запущен
```

Никакого перезапуска сервера не нужно — данные загружаются через fetch при открытии сайта.

---

## Скрыть проект

В `config.json` поставь:

```json
"published": false
```

Проект пропадёт с сайта, файлы остаются нетронутыми.

---

## Изменить личные данные

Открой `public/content/site.json`:

```json
{
  "person": {
    "name": "Андрей",
    "role": "Backend & Bots Developer",
    "bio": "Краткий текст под именем.",
    "avatar": "/content/avatar.jpg"
  },
  "links": [
    { "label": "GitHub",   "icon": "github",   "url": "https://github.com/marensovich" },
    { "label": "Telegram", "icon": "telegram", "url": "https://t.me/marensovich" }
  ],
  "stats": [
    { "value": "2+", "label": "года опыта" },
    { "value": "20+", "label": "проектов" }
  ],
  "about": [
    "Первый абзац о себе.",
    "Второй абзац."
  ],
  "experience": [
    {
      "title": "Freelance Developer",
      "place": "Kwork / частные клиенты",
      "from": "2023",
      "description": "Описание",
      "tags": ["Java", "Python"]
    }
  ]
}
```

**Доступные иконки для `links`:** `github`, `telegram`, `instagram`, `discord`, `linkedin`, `youtube`, `twitter`, `vk`, `mail`, `website`

### Аватар

Положи фото в `public/content/avatar.jpg` — путь уже прописан.

---

## Изменить цвета/тему

Открой `public/content/theme.json`:

```json
{
  "theme": {
    "accent": "#0A84FF",
    "darkModeDefault": true
  }
}
```

---

## Деплой

```bash
npm run build   # → папка dist/
```

На **Vercel**: подключи репозиторий, Build Command: `npm run build`, Output: `dist`. При пуше пересобирается автоматически.

---

## Частые вопросы

**Проект не появился?**
— Проверь `"published": true` в `config.json` и что слаг есть в `projects.json`.

**Фото не загружается?**
— Имя файла в `mainPhotos`/`cover` должно совпадать с реальным именем файла (регистр важен).

**Как изменить порядок проектов?**
— Переставь слаги в `projects.json`. Что выше в массиве — то левее/выше в сетке.

# ⚡ README Forge

Generate stunning GitHub profile READMEs with live preview. Choose templates, customize components, and export in seconds.

![README Forge](https://img.shields.io/badge/README_Forge-GitHub_Profile_Generator-blue?style=for-the-badge&logo=github)

## ✨ Features

- **3 Templates** — Minimal, Developer, Creative
- **Live Preview** — See your README rendered in real-time
- **GitHub Auto-Fetch** — Enter your username, auto-fill profile data
- **Component Picker** — Toggle stats, streak, trophies, typing animation, etc.
- **38 Tech Stack Badges** — One-click badges from shields.io
- **12 Stats Themes** — Tokyo Night, Dracula, Nord, and more
- **Copy & Download** — One-click copy or download as README.md
- **Mobile Responsive** — Works on desktop and mobile
- **Zero Cost** — Deploy free on Vercel, no database needed
- **Open Source** — Free forever

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/rinopatrick/readme-forge.git
cd readme-forge

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Next.js 15** — React framework
- **TypeScript** — Type-safe
- **Tailwind CSS 4** — Styling
- **react-markdown** — Live preview rendering
- **GitHub API** — User data fetching

## 📁 Project Structure

```
src/
├── app/
│   ├── api/github/route.ts    ← GitHub API proxy
│   ├── globals.css             ← Theme & scrollbar
│   ├── layout.tsx              ← SEO metadata
│   └── page.tsx                ← Main page + state
├── components/
│   ├── Sidebar.tsx             ← 3-tab editor panel
│   └── Preview.tsx             ← Preview + code view
└── lib/
    ├── generator.ts            ← README markdown generator
    ├── github.ts               ← GitHub API client
    └── types.ts                ← Types & constants
```

## 🎨 Templates

| Template | Description |
|----------|-------------|
| **Minimal** | Clean and simple. Stats + badges. No fluff. |
| **Developer** | Feature-rich. Stats, streak, trophies, typing SVG, social links. |
| **Creative** | Expressive. Centered layout, gradient headers, capsule-render footer. |

## 🧩 Components

Each component can be toggled on/off:

- **Typing Animation** — Animated text via readme-typing-svg
- **GitHub Stats** — Contribution stats card
- **Top Languages** — Most used languages chart
- **Streak Stats** — Consecutive days coding
- **Trophies** — GitHub achievement badges
- **Visitor Badge** — Page view counter
- **Social Links** — Twitter, LinkedIn, Website, Email badges
- **Tech Stack** — 38+ technology badges

## 🚢 Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click Deploy — zero config needed

## 🤝 Contributing

1. Fork the repo
2. Create your branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "feat: add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

## 📄 License

MIT © [Rino Patrick](https://github.com/rinopatrick)

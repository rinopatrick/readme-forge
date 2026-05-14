import { TECH_STACK_OPTIONS, type ReadmeConfig, type ThemeType } from "./types";

const STATS_THEMES: Record<ThemeType, string> = {
  default: "default",
  dark: "dark",
  radical: "radical",
  merko: "merko",
  gruvbox: "gruvbox",
  tokyonight: "tokyonight",
  cobalt: "cobalt",
  synthwave: "synthwave",
  highcontrast: "highcontrast",
  dracula: "dracula",
  prussian: "prussian",
  monokai: "monokai",
  vue: "vue",
  "vue-dark": "vue-dark",
  "shades-of-purple": "shades-of-purple",
  nightowl: "nightowl",
  buefy: "buefy",
  "blue-green": "blue-green",
  algolia: "algolia",
  "great-gatsby": "great-gatsby",
  darcula: "darcula",
  bear: "bear",
  "solarized-dark": "solarized-dark",
  "solarized-light": "solarized-light",
  "chartreuse-dark": "chartreuse-dark",
  nord: "nord",
  gotham: "gotham",
  "material-palenight": "material-palenight",
  graywhite: "graywhite",
  "vision-friendly-dark": "vision-friendly-dark",
  "ayu-mirage": "ayu-mirage",
  "midnight-purple": "midnight-purple",
  calm: "calm",
  "flag-india": "flag-india",
  omni: "omni",
  react: "react",
  jolly: "jolly",
  maroongold: "maroongold",
  yeblu: "yeblu",
  blueberry: "blueberry",
  slateorange: "slateorange",
  kacho_ga: "kacho_ga",
  urban: "urban",
  sanctum: "sanctum",
  "github-dark": "github-dark",
  "github-light": "github-light",
};

function badgeMarkdown(label: string, logo: string, color: string = "222222"): string {
  return `![${label}](https://img.shields.io/badge/${encodeURIComponent(label)}-${color}?style=for-the-badge&logo=${logo}&logoColor=white)`;
}

function statsCard(username: string, theme: string, showIcons: boolean = true): string {
  return `![GitHub stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=${showIcons}&theme=${theme})`;
}

function streakCard(username: string, theme: string): string {
  return `![GitHub streak](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme})`;
}

function trophyCard(username: string): string {
  return `![Trophy](https://github-profile-trophy.vercel.app/?username=${username}&theme=flat&no-frame=true&no-bg=true&margin-w=4)`;
}

function topLangsCard(username: string, theme: string): string {
  return `![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme})`;
}

function typingSvg(texts: string[]): string {
  const lines = texts.map((t) => encodeURIComponent(t)).join("&");
  return `![Typing SVG](https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=20&pause=1000&color=58A6FF&center=true&vCenter=true&width=500&lines=${lines})`;
}

function visitorBadge(username: string): string {
  return `![Visitor Count](https://komarev.com/ghpvc/?username=${username}&style=flat-square&color=blue)`;
}

function socialLinks(config: ReadmeConfig): string {
  const links: string[] = [];
  if (config.twitter) {
    links.push(`[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/${config.twitter})`);
  }
  if (config.linkedin) {
    links.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=for-the-badge&logo=LinkedIn&logoColor=white)](https://linkedin.com/in/${config.linkedin})`);
  }
  if (config.website) {
    links.push(`[![Website](https://img.shields.io/badge/Website-%23000000.svg?style=for-the-badge&logo=About.me&logoColor=white)](${config.website})`);
  }
  if (config.email) {
    links.push(`[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=Gmail&logoColor=white)](mailto:${config.email})`);
  }
  return links.join("\n");
}

function techStackBadges(techStack: string[]): string {
  return techStack
    .map((tech) => {
      const info = TECH_STACK_OPTIONS[tech];
      if (!info) return "";
      return badgeMarkdown(info.label, info.logo);
    })
    .filter(Boolean)
    .join(" ");
}

export function generateMinimal(config: ReadmeConfig): string {
  const theme = STATS_THEMES[config.theme] || "default";
  const name = config.displayName || config.username;
  const parts: string[] = [];

  // Header
  parts.push(`# ${name}`);
  if (config.tagline) {
    parts.push(`\n> ${config.tagline}`);
  }

  // Bio
  if (config.bio) {
    parts.push(`\n${config.bio}`);
  }

  // Visitor badge
  if (config.visitorBadge && config.username) {
    parts.push(`\n${visitorBadge(config.username)}`);
  }

  // Typing SVG
  if (config.showTypingSvg && config.typingTexts.length > 0) {
    parts.push(`\n${typingSvg(config.typingTexts)}`);
  }

  // Social links
  if (config.socialLinks) {
    const links = socialLinks(config);
    if (links) parts.push(`\n${links}`);
  }

  // Tech stack
  if (config.techStack.length > 0) {
    parts.push(`\n## Tech Stack\n`);
    parts.push(techStackBadges(config.techStack));
  }

  // Stats
  if (config.showStats && config.username) {
    parts.push(`\n## Stats\n`);
    parts.push(statsCard(config.username, theme));
  }

  return parts.join("\n");
}

export function generateDeveloper(config: ReadmeConfig): string {
  const theme = STATS_THEMES[config.theme] || "default";
  const name = config.displayName || config.username;
  const parts: string[] = [];

  // Header
  parts.push(`<h1 align="center">Hi 👋, I'm ${name}</h1>`);

  // Typing SVG
  if (config.showTypingSvg && config.typingTexts.length > 0) {
    parts.push(`<h3 align="center">${typingSvg(config.typingTexts)}</h3>`);
  } else if (config.tagline) {
    parts.push(`<h3 align="center">${config.tagline}</h3>`);
  }

  // Visitor badge
  if (config.visitorBadge && config.username) {
    parts.push(`\n<p align="center">${visitorBadge(config.username)}</p>`);
  }

  // Bio
  if (config.bio) {
    parts.push(`\n<p align="center">${config.bio}</p>`);
  }

  // Social links
  if (config.socialLinks) {
    const links = socialLinks(config);
    if (links) parts.push(`\n<p align="center">\n${links}\n</p>`);
  }

  // Tech stack
  if (config.techStack.length > 0) {
    parts.push(`\n## 🛠️ Tech Stack\n`);
    parts.push(techStackBadges(config.techStack));
  }

  // Stats section
  const statsSection: string[] = [];
  if (config.showStats && config.username) {
    statsSection.push(statsCard(config.username, theme));
  }
  if (config.showTopLangs && config.username) {
    statsSection.push(topLangsCard(config.username, theme));
  }
  if (statsSection.length > 0) {
    parts.push(`\n## 📊 GitHub Stats\n`);
    if (statsSection.length === 2) {
      parts.push(`<p align="center">\n${statsSection[0]}\n${statsSection[1]}\n</p>`);
    } else {
      parts.push(statsSection.join("\n"));
    }
  }

  // Streak
  if (config.showStreak && config.username) {
    parts.push(`\n## 🔥 Streak\n`);
    parts.push(streakCard(config.username, theme));
  }

  // Trophy
  if (config.showTrophy && config.username) {
    parts.push(`\n## 🏆 Trophies\n`);
    parts.push(`<p align="center">${trophyCard(config.username)}</p>`);
  }

  // Footer
  parts.push(`\n---\n<p align="center"><img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="30"> <em>Feel free to explore my repos!</em></p>`);

  return parts.join("\n");
}

export function generateCreative(config: ReadmeConfig): string {
  const theme = STATS_THEMES[config.theme] || "default";
  const name = config.displayName || config.username;
  const parts: string[] = [];

  // Creative header with ASCII art style
  parts.push(`<div align="center">\n`);
  parts.push(`# ✨ ${name} ✨\n`);
  if (config.tagline) {
    parts.push(`### _${config.tagline}_\n`);
  }
  if (config.showTypingSvg && config.typingTexts.length > 0) {
    parts.push(`${typingSvg(config.typingTexts)}\n`);
  }
  if (config.bio) {
    parts.push(`\n${config.bio}\n`);
  }
  parts.push(`</div>\n`);

  // Visitor badge
  if (config.visitorBadge && config.username) {
    parts.push(`<div align="center">${visitorBadge(config.username)}</div>\n`);
  }

  // Social links
  if (config.socialLinks) {
    const links = socialLinks(config);
    if (links) parts.push(`<div align="center">\n${links}\n</div>\n`);
  }

  // Tech stack with creative layout
  if (config.techStack.length > 0) {
    parts.push(`## 💻 What I Work With\n`);
    parts.push(`<div align="center">\n`);
    parts.push(techStackBadges(config.techStack));
    parts.push(`\n</div>\n`);
  }

  // Stats in creative layout
  if (config.showStats && config.username) {
    parts.push(`## 📈 My GitHub Journey\n`);
    parts.push(`<div align="center">`);
    parts.push(statsCard(config.username, theme, true));
    if (config.showStreak) {
      parts.push(`\n${streakCard(config.username, theme)}`);
    }
    parts.push(`</div>\n`);
  }

  if (config.showTopLangs && config.username) {
    parts.push(`<div align="center">`);
    parts.push(topLangsCard(config.username, theme));
    parts.push(`</div>\n`);
  }

  // Trophy
  if (config.showTrophy && config.username) {
    parts.push(`## 🎖️ Achievements\n`);
    parts.push(`<div align="center">${trophyCard(config.username)}</div>\n`);
  }

  // Creative footer
  parts.push(`<div align="center">\n`);
  parts.push(`![Wave](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=12&height=80&section=footer)`);
  parts.push(`</div>`);

  return parts.join("\n");
}

export function generateReadme(config: ReadmeConfig): string {
  switch (config.template) {
    case "minimal":
      return generateMinimal(config);
    case "developer":
      return generateDeveloper(config);
    case "creative":
      return generateCreative(config);
    default:
      return generateDeveloper(config);
  }
}

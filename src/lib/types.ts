export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  description: string | null;
  fork: boolean;
}

export interface ReadmeConfig {
  username: string;
  displayName: string;
  tagline: string;
  bio: string;
  location: string;
  company: string;
  website: string;
  twitter: string;
  linkedin: string;
  email: string;
  template: TemplateType;
  theme: ThemeType;
  showStats: boolean;
  showStreak: boolean;
  showTrophy: boolean;
  showActivity: boolean;
  showTopLangs: boolean;
  showTypingSvg: boolean;
  typingTexts: string[];
  techStack: string[];
  socialLinks: boolean;
  visitorBadge: boolean;
}

export type TemplateType = "minimal" | "developer" | "creative";
export type ThemeType = "default" | "dark" | "radical" | "merko" | "gruvbox" | "tokyonight" | "cobalt" | "synthwave" | "highcontrast" | "dracula" | "prussian" | "monokai" | "vue" | "vue-dark" | "shades-of-purple" | "nightowl" | "buefy" | "blue-green" | "algolia" | "great-gatsby" | "darcula" | "bear" | "solarized-dark" | "solarized-light" | "chartreuse-dark" | "nord" | "gotham" | "material-palenight" | "graywhite" | "vision-friendly-dark" | "ayu-mirage" | "midnight-purple" | "calm" | "flag-india" | "omni" | "react" | "jolly" | "maroongold" | "yeblu" | "blueberry" | "slateorange" | "kacho_ga" | "urban" | "sanctum" | "github-dark" | "github-light";

export const DEFAULT_CONFIG: ReadmeConfig = {
  username: "",
  displayName: "",
  tagline: "",
  bio: "",
  location: "",
  company: "",
  website: "",
  twitter: "",
  linkedin: "",
  email: "",
  template: "developer",
  theme: "default",
  showStats: true,
  showStreak: true,
  showTrophy: false,
  showActivity: false,
  showTopLangs: true,
  showTypingSvg: true,
  typingTexts: ["Full-Stack Developer", "Open Source Enthusiast", "Coffee Lover"],
  techStack: ["Python", "JavaScript", "TypeScript", "React", "Next.js", "FastAPI"],
  socialLinks: true,
  visitorBadge: true,
};

export const TECH_STACK_OPTIONS: Record<string, { label: string; logo: string }> = {
  Python: { label: "Python", logo: "python" },
  JavaScript: { label: "JavaScript", logo: "javascript" },
  TypeScript: { label: "TypeScript", logo: "typescript" },
  React: { label: "React", logo: "react" },
  Nextjs: { label: "Next.js", logo: "nextdotjs" },
  Vue: { label: "Vue.js", logo: "vuedotjs" },
  Angular: { label: "Angular", logo: "angular" },
  Svelte: { label: "Svelte", logo: "svelte" },
  Nodejs: { label: "Node.js", logo: "nodedotjs" },
  Deno: { label: "Deno", logo: "deno" },
  FastAPI: { label: "FastAPI", logo: "fastapi" },
  Django: { label: "Django", logo: "django" },
  Flask: { label: "Flask", logo: "flask" },
  Go: { label: "Go", logo: "go" },
  Rust: { label: "Rust", logo: "rust" },
  Java: { label: "Java", logo: "openjdk" },
  Kotlin: { label: "Kotlin", logo: "kotlin" },
  Swift: { label: "Swift", logo: "swift" },
  Docker: { label: "Docker", logo: "docker" },
  Kubernetes: { label: "Kubernetes", logo: "kubernetes" },
  AWS: { label: "AWS", logo: "amazonaws" },
  GCP: { label: "GCP", logo: "googlecloud" },
  Azure: { label: "Azure", logo: "microsoftazure" },
  PostgreSQL: { label: "PostgreSQL", logo: "postgresql" },
  MongoDB: { label: "MongoDB", logo: "mongodb" },
  Redis: { label: "Redis", logo: "redis" },
  GraphQL: { label: "GraphQL", logo: "graphql" },
  TailwindCSS: { label: "Tailwind CSS", logo: "tailwindcss" },
  Prisma: { label: "Prisma", logo: "prisma" },
  Linux: { label: "Linux", logo: "linux" },
  Git: { label: "Git", logo: "git" },
  Firebase: { label: "Firebase", logo: "firebase" },
  Vercel: { label: "Vercel", logo: "vercel" },
  Nginx: { label: "Nginx", logo: "nginx" },
  RaspberryPi: { label: "Raspberry Pi", logo: "raspberrypi" },
  Arduino: { label: "Arduino", logo: "arduino" },
  Unity: { label: "Unity", logo: "unity" },
  Godot: { label: "Godot", logo: "godotengine" },
  Figma: { label: "Figma", logo: "figma" },
};

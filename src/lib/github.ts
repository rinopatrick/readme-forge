import type { GitHubUser, GitHubRepo } from "./types";

const GITHUB_API = "https://api.github.com";

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=stars&per_page=6`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos.filter((r) => !r.fork);
  } catch {
    return [];
  }
}

export function extractTopLanguages(repos: GitHubRepo[]): string[] {
  const langCount: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  }
  return Object.entries(langCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([lang]) => lang);
}

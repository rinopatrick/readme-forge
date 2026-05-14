import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "readme-forge",
        },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=6`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "readme-forge",
        },
      }),
    ]);

    if (!userRes.ok) {
      return NextResponse.json(
        { error: `GitHub user not found: ${username}` },
        { status: 404 }
      );
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    const langCount: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language && !repo.fork) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    }
    const topLanguages = Object.entries(langCount)
      .sort(([, a]: [string, number], [, b]: [string, number]) => b - a)
      .slice(0, 6)
      .map(([lang]) => lang);

    return NextResponse.json({ user, topLanguages });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { ReadmeConfig } from "@/lib/types";
import { DEFAULT_CONFIG } from "@/lib/types";
import { generateReadme } from "@/lib/generator";
import Sidebar from "@/components/Sidebar";
import Preview from "@/components/Preview";

function loadSavedConfig(): ReadmeConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const saved = localStorage.getItem("readme-forge-config");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch {
    // Ignore
  }
  return DEFAULT_CONFIG;
}

function configToUrlParams(config: ReadmeConfig): string {
  const params = new URLSearchParams();
  const keysToEncode: (keyof ReadmeConfig)[] = [
    "username", "displayName", "tagline", "bio", "location", "company",
    "website", "twitter", "linkedin", "email", "template", "theme",
  ];
  for (const key of keysToEncode) {
    const value = config[key];
    if (typeof value === "string" && value) {
      params.set(key, value);
    }
  }
  if (config.showStats) params.set("showStats", "1");
  if (config.showStreak) params.set("showStreak", "1");
  if (config.showTrophy) params.set("showTrophy", "1");
  if (config.showTopLangs) params.set("showTopLangs", "1");
  if (config.showTypingSvg) params.set("showTypingSvg", "1");
  if (config.showActivity) params.set("showActivity", "1");
  if (config.socialLinks) params.set("socialLinks", "1");
  if (config.visitorBadge) params.set("visitorBadge", "1");
  if (config.techStack.length > 0) params.set("techStack", config.techStack.join(","));
  if (config.typingTexts.length > 0) params.set("typingTexts", config.typingTexts.join(","));
  return params.toString();
}

export default function Home() {
  const [config, setConfig] = useState<ReadmeConfig>(loadSavedConfig);
  const [isFetching, setIsFetching] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const isInitialMount = useRef(true);

  const markdown = generateReadme(config);

  const handleFetchGitHub = useCallback(async (username: string) => {
    setIsFetching(true);
    try {
      const res = await fetch(`/api/github?username=${encodeURIComponent(username)}`);
      if (res.ok) {
        const data = await res.json();
        const user = data.user;
        const topLangs: string[] = data.topLanguages || [];

        const langMapping: Record<string, string> = {
          JavaScript: "JavaScript",
          TypeScript: "TypeScript",
          Python: "Python",
          Go: "Go",
          Rust: "Rust",
          Java: "Java",
          Kotlin: "Kotlin",
          Swift: "Swift",
          Shell: "Linux",
          Vue: "Vue",
        };

        const mappedLangs = topLangs
          .map((lang: string) => langMapping[lang])
          .filter((l: string) => l && l !== "N/A");

        setConfig((prev) => ({
          ...prev,
          username: user.login || prev.username,
          displayName: user.name || prev.displayName || user.login,
          bio: user.bio || prev.bio,
          location: user.location || prev.location,
          company: user.company || prev.company,
          website: user.blog || prev.website,
          twitter: user.twitter_username || prev.twitter,
          techStack: mappedLangs.length > 0 ? mappedLangs : prev.techStack,
        }));
      }
    } catch {
      // Silently fail
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem("readme-forge-config");
    } catch {
      // Ignore
    }
  }, []);

  const handleShare = useCallback(async () => {
    const params = configToUrlParams(config);
    const url = `${window.location.origin}${params ? `?${params}` : ""}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  }, [config]);

  // Persist to localStorage
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    try {
      localStorage.setItem("readme-forge-config", JSON.stringify(config));
    } catch {
      // Ignore
    }
  }, [config]);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-zinc-950">
      <Sidebar
        config={config}
        onChange={setConfig}
        onFetchGitHub={handleFetchGitHub}
        isFetching={isFetching}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onReset={handleReset}
        onShare={handleShare}
        shareCopied={shareCopied}
      />
      <Preview
        markdown={markdown}
        config={config}
        onOpenSidebar={() => setSidebarOpen(true)}
      />
    </div>
  );
}
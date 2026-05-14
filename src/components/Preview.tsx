"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReadmeConfig } from "@/lib/types";

interface PreviewProps {
  markdown: string;
  config: ReadmeConfig;
  onOpenSidebar: () => void;
}

function generateGitHubActionsWorkflow(): string {
  return `name: Update README

on:
  schedule:
    - cron: "0 0 * * *" # Runs daily at midnight UTC
  workflow_dispatch:

jobs:
  update-readme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Update README with recent activity
        uses: jamesgeorge007/github-activity-readme@master
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        with:
          MAX_LINES: 5

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git diff --quiet || git commit -am "chore: update readme activity"
          git push
`;
}

export default function Preview({ markdown, config: _config, onOpenSidebar }: PreviewProps) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [showActionsModal, setShowActionsModal] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = markdown;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "README.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadWorkflow = () => {
    const workflow = generateGitHubActionsWorkflow();
    const blob = new Blob([workflow], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "update-readme.yml";
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderedMarkdown = useMemo(
    () => (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt || ""} className="max-w-full" loading="lazy" />
          ),
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold mt-4 mb-2 text-zinc-100">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold mt-5 mb-2 text-zinc-100">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold mt-3 mb-1 text-zinc-200">{children}</h3>
          ),
          p: ({ children }) => <p className="my-2 text-zinc-300 leading-relaxed">{children}</p>,
          a: ({ href, children }) => (
            <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          code: ({ className, children }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-blue-300">{children}</code>
            ) : (
              <code className={`${className} block bg-zinc-800 p-3 rounded-lg text-sm overflow-x-auto`}>{children}</code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 my-3 text-zinc-400 italic">{children}</blockquote>
          ),
          hr: () => <hr className="border-zinc-700 my-4" />,
          ul: ({ children }) => <ul className="list-disc list-inside my-2 space-y-1 text-zinc-300">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside my-2 space-y-1 text-zinc-300">{children}</ol>,
          div: ({ children }) => <div className="my-2">{children}</div>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    ),
    [markdown]
  );

  return (
    <main className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          {/* Mobile menu button */}
          <button
            onClick={onOpenSidebar}
            className="lg:hidden p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-0.5">
            <button
              onClick={() => setView("preview")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                view === "preview" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setView("code")}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                view === "code" ? "bg-zinc-700 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Markdown
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* GitHub Actions workflow */}
          <button
            onClick={() => setShowActionsModal(true)}
            title="Download GitHub Actions workflow for auto-update"
            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="hidden md:inline">Auto-Update</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-2.5 sm:px-3 py-1.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            onClick={handleCopy}
            disabled={!markdown}
            className={`px-2.5 sm:px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
              copied
                ? "bg-green-600 text-white"
                : "bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white"
            }`}
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {view === "preview" ? (
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/20">
              {markdown ? (
                renderedMarkdown
              ) : (
                <div className="text-center py-16 sm:py-20">
                  <div className="text-6xl mb-4 animate-pulse">⚡</div>
                  <h3 className="text-xl font-bold text-zinc-300">Start Building</h3>
                  <p className="text-zinc-500 mt-2 text-sm max-w-xs mx-auto">
                    Enter your GitHub username and customize your README from the sidebar
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute top-3 right-3 flex items-center gap-1.5 text-zinc-500">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <pre className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 pt-10 text-sm text-green-400 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-2xl shadow-black/20">
                {markdown || "// Your README markdown will appear here..."}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* GitHub Actions Modal */}
      {showActionsModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowActionsModal(false)} />
          <div className="relative bg-zinc-900 border border-zinc-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <button
              onClick={() => setShowActionsModal(false)}
              className="absolute top-4 right-4 p-1 rounded-md hover:bg-zinc-800 text-zinc-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm">
                🔄
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Auto-Update Workflow</h3>
                <p className="text-[10px] text-zinc-500">GitHub Actions · Daily refresh</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-zinc-300">
              <p>Download a GitHub Actions workflow that automatically updates your profile README with recent activity every day.</p>

              <div className="bg-zinc-800 rounded-lg p-3 space-y-2">
                <p className="text-xs font-semibold text-zinc-400">Setup steps:</p>
                <ol className="text-xs text-zinc-400 space-y-1 list-decimal list-inside">
                  <li>Download the workflow file</li>
                  <li>Create <code className="text-blue-300 bg-zinc-900 px-1 rounded">.github/workflows/</code> in your profile repo</li>
                  <li>Place <code className="text-blue-300 bg-zinc-900 px-1 rounded">update-readme.yml</code> in that folder</li>
                  <li>Commit and push — it runs automatically at midnight UTC</li>
                </ol>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setShowActionsModal(false)}
                className="flex-1 py-2.5 text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDownloadWorkflow();
                  setShowActionsModal(false);
                }}
                className="flex-1 py-2.5 text-xs font-medium bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
              >
                Download Workflow
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

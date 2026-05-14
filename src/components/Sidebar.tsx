"use client";

import { useState, useCallback } from "react";
import type { ReadmeConfig, TemplateType, ThemeType } from "@/lib/types";
import { TECH_STACK_OPTIONS } from "@/lib/types";

interface SidebarProps {
  config: ReadmeConfig;
  onChange: (config: ReadmeConfig) => void;
  onFetchGitHub: (username: string) => Promise<void>;
  isFetching: boolean;
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  onShare: () => void;
  shareCopied: boolean;
}

export default function Sidebar({ config, onChange, onFetchGitHub, isFetching, isOpen, onClose, onReset, onShare, shareCopied }: SidebarProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "components" | "style">("profile");
  const [typingInput, setTypingInput] = useState(config.typingTexts.join(", "));

  const update = useCallback(
    (partial: Partial<ReadmeConfig>) => {
      onChange({ ...config, ...partial });
    },
    [config, onChange]
  );

  const handleFetchGitHub = useCallback(() => {
    if (config.username.trim()) {
      onFetchGitHub(config.username.trim());
    }
  }, [config.username, onFetchGitHub]);

  const handleTypingChange = useCallback(
    (value: string) => {
      setTypingInput(value);
      const texts = value
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      update({ typingTexts: texts });
    },
    [update]
  );

  const toggleTech = useCallback(
    (tech: string) => {
      const stack = config.techStack.includes(tech)
        ? config.techStack.filter((t) => t !== tech)
        : [...config.techStack, tech];
      update({ techStack: stack });
    },
    [config.techStack, update]
  );

  const templates: { value: TemplateType; label: string; desc: string; icon: string }[] = [
    { value: "minimal", label: "Minimal", desc: "Clean & simple", icon: "◻" },
    { value: "developer", label: "Developer", desc: "Feature-rich", icon: "⟨/⟩" },
    { value: "creative", label: "Creative", desc: "Expressive", icon: "✦" },
  ];

  const popularThemes: { value: ThemeType; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "dark", label: "Dark" },
    { value: "tokyonight", label: "Tokyo Night" },
    { value: "dracula", label: "Dracula" },
    { value: "nord", label: "Nord" },
    { value: "radical", label: "Radical" },
    { value: "synthwave", label: "Synthwave" },
    { value: "github-dark", label: "GitHub Dark" },
    { value: "cobalt", label: "Cobalt" },
    { value: "monokai", label: "Monokai" },
    { value: "vue-dark", label: "Vue Dark" },
    { value: "gruvbox", label: "Gruvbox" },
  ];

  const sidebarContent = (
    <>
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20">
              ⚡
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">README Forge</h1>
              <p className="text-[10px] text-zinc-500">GitHub Profile Generator</p>
            </div>
          </div>
          {/* Close button for mobile */}
          <div className="flex items-center gap-1">
            <button
              onClick={onShare}
              title="Share config via URL"
              className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              {shareCopied ? (
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => {
                if (confirm("Reset all settings to defaults?")) onReset();
              }}
              title="Reset to defaults"
              className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-red-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* GitHub Fetch */}
      <div className="p-4 border-b border-zinc-800">
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">GitHub Username</label>
        <div className="flex gap-2 mt-1.5">
          <input
            type="text"
            value={config.username}
            onChange={(e) => update({ username: e.target.value })}
            placeholder="e.g. rinopatrick"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            onKeyDown={(e) => e.key === "Enter" && handleFetchGitHub()}
          />
          <button
            onClick={handleFetchGitHub}
            disabled={isFetching || !config.username.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
          >
            {isFetching ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Fetch"
            )}
          </button>
        </div>
        <p className="text-[10px] text-zinc-600 mt-1.5">Auto-fills your profile data from GitHub</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800">
        {(["profile", "components", "style"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? "text-blue-400 border-b-2 border-blue-400 bg-blue-400/5"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === "profile" && (
          <>
            <Field label="Display Name" value={config.displayName} onChange={(v) => update({ displayName: v })} placeholder="Your Name" />
            <Field label="Tagline" value={config.tagline} onChange={(v) => update({ tagline: v })} placeholder="A passionate developer..." />
            <Field label="Bio" value={config.bio} onChange={(v) => update({ bio: v })} placeholder="Write something about yourself..." multiline />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Location" value={config.location} onChange={(v) => update({ location: v })} placeholder="Jakarta, ID" />
              <Field label="Company" value={config.company} onChange={(v) => update({ company: v })} placeholder="@company" />
            </div>
            <Field label="Website" value={config.website} onChange={(v) => update({ website: v })} placeholder="https://yoursite.com" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Twitter" value={config.twitter} onChange={(v) => update({ twitter: v })} placeholder="username" />
              <Field label="LinkedIn" value={config.linkedin} onChange={(v) => update({ linkedin: v })} placeholder="username" />
            </div>
            <Field label="Email" value={config.email} onChange={(v) => update({ email: v })} placeholder="you@example.com" />
          </>
        )}

        {activeTab === "components" && (
          <>
            <SectionLabel text="Animations" />
            <Toggle label="Typing Animation" checked={config.showTypingSvg} onChange={(v) => update({ showTypingSvg: v })} />
            {config.showTypingSvg && (
              <Field
                label="Typing Texts (comma-separated)"
                value={typingInput}
                onChange={handleTypingChange}
                placeholder="Full-Stack Developer, Open Source Fan, Coffee Lover"
              />
            )}

            <SectionLabel text="Stats & Activity" />
            <Toggle label="GitHub Stats Card" checked={config.showStats} onChange={(v) => update({ showStats: v })} />
            <Toggle label="Top Languages" checked={config.showTopLangs} onChange={(v) => update({ showTopLangs: v })} />
            <Toggle label="Streak Stats" checked={config.showStreak} onChange={(v) => update({ showStreak: v })} />
            <Toggle label="Trophies" checked={config.showTrophy} onChange={(v) => update({ showTrophy: v })} />
            <Toggle label="Visitor Badge" checked={config.visitorBadge} onChange={(v) => update({ visitorBadge: v })} />

            <SectionLabel text="Links" />
            <Toggle label="Social Links" checked={config.socialLinks} onChange={(v) => update({ socialLinks: v })} />

            <SectionLabel text="Tech Stack" />
            <div className="flex flex-wrap gap-1.5">
              {Object.keys(TECH_STACK_OPTIONS).map((tech) => (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all duration-150 ${
                    config.techStack.includes(tech)
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                      : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                  }`}
                >
                  {TECH_STACK_OPTIONS[tech].label}
                </button>
              ))}
            </div>
          </>
        )}

        {activeTab === "style" && (
          <>
            {/* Template */}
            <div>
              <SectionLabel text="Template" />
              <div className="grid grid-cols-3 gap-2 mt-2">
                {templates.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => update({ template: t.value })}
                    className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                      config.template === t.value
                        ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-sm shadow-blue-500/10"
                        : "border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800"
                    }`}
                  >
                    <div className="text-lg mb-0.5">{t.icon}</div>
                    <div className="text-xs font-semibold">{t.label}</div>
                    <div className="text-[10px] mt-0.5 opacity-60">{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <SectionLabel text="Stats Theme" />
              <div className="grid grid-cols-3 gap-1.5 mt-2">
                {popularThemes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => update({ theme: t.value })}
                    className={`px-2 py-1.5 text-xs rounded-lg font-medium transition-all duration-150 ${
                      config.theme === t.value
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-600/30"
                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium teaser */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-cyan-900/30 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">✨</span>
                <span className="text-sm font-bold text-purple-300">Premium Templates</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-semibold uppercase">Soon</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Unlock 10+ premium templates with animated headers, interactive widgets, custom SVG components, and capsule-render banners.
              </p>
              <button className="mt-3 w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-colors">
                Notify Me
              </button>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center justify-between">
          <a
            href="https://github.com/rinopatrick/readme-forge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span className="text-[10px] font-medium">Star on GitHub</span>
          </a>
          <a
            href="https://github.com/sponsors/rinopatrick"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-pink-400/70 hover:text-pink-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span className="text-[10px] font-medium">Sponsor</span>
          </a>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[420px] xl:w-[460px] bg-zinc-900 border-r border-zinc-800 flex-col h-full overflow-hidden">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[340px] bg-zinc-900 border-r border-zinc-800 flex flex-col h-full overflow-hidden transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 pt-2 first:pt-0">
      <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">{text}</span>
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const cls =
    "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-shadow";
  return (
    <div>
      <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${cls} mt-1 min-h-[60px] resize-y`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${cls} mt-1`}
        />
      )}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-zinc-300">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
          checked ? "bg-blue-600" : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

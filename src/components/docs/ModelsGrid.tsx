"use client";

import * as React from "react";

const MODELS = [
  {
    name: "Claude 3.7 Sonnet",
    provider: "Anthropic",
    icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/anthropic.svg",
    badge: "Reasoning",
  },
  {
    name: "GPT-4o & o3-mini",
    provider: "OpenAI",
    icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/openai.svg",
    badge: "Flagship",
  },
  {
    name: "DeepSeek V4 Pro",
    provider: "DeepSeek",
    icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/deepseek.svg",
    badge: "Open Weights",
  },
  {
    name: "Qwen 2.5 Coder 32B",
    provider: "Alibaba",
    icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/qwen.svg",
    badge: "Local (Ollama)",
  },
  {
    name: "Kimi K3.1 Pro",
    provider: "Moonshot AI",
    icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/moonshot.svg",
    badge: "2M Context",
  },
  {
    name: "GLM-5.3",
    provider: "Zhipu AI",
    icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/zai.svg",
    badge: "Fast",
  },
  {
    name: "Gemini 2.5 Pro",
    provider: "Google",
    icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/gemini.svg",
    badge: "Multimodal",
  },
  {
    name: "Grok 3",
    provider: "xAI",
    icon: "https://cdn.jsdelivr.net/gh/lobehub/lobe-icons@master/packages/static-svg/icons/xai.svg",
    badge: "Real-time",
  },
];

export function ModelsGrid() {
  return (
    <div className="not-prose border border-dashed border-border rounded-lg overflow-hidden bg-background my-8">
      {/* Header with signature // prefix */}
      <div className="border-b border-dashed border-border px-5 py-3.5 bg-muted/20 flex items-center justify-between">
        <h2 className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2 m-0">
          <span className="text-muted-foreground/60 tracking-[-0.2em] font-mono mr-1">{"//"}</span>
          Models. All of them.
        </h2>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest hidden sm:inline">
          Cloud & Local BYOK
        </span>
      </div>

      {/* Grid of models */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {MODELS.map((model, idx) => (
          <div
            key={idx}
            className="-mb-px -mr-px flex flex-col justify-between p-4 border-b border-r border-dashed border-border hover:bg-muted/30 transition-colors group"
          >
            <div className="flex items-center justify-between gap-2">
              <img
                src={model.icon}
                alt={model.provider}
                loading="lazy"
                className="size-5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity [filter:brightness(0)_invert(1)]"
              />
              <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded border border-border">
                {model.badge}
              </span>
            </div>
            <div className="mt-3">
              <div className="text-xs font-semibold text-foreground group-hover:text-brand-text truncate">
                {model.name}
              </div>
              <div className="text-[10px] text-muted-foreground truncate mt-0.5">
                {model.provider}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


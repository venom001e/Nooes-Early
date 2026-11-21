"use client"

import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer"

export default function HalftoneFooterDemo() {
  return (
    <div className="w-full">
      <HalftoneWordmarkFooter
        wordmark="Nooes"
        label="Nooes"
        meta="©2026 · The AI Software Engineering Platform"
        palette={{ warm: "#3b82f6" }}
      />
    </div>
  )
}


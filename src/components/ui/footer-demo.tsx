"use client"

import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer"

export default function HalftoneFooterDemo() {
  return (
    <div className="w-full">
      <HalftoneWordmarkFooter
        wordmark="Nooes"
        label="Nooes"
        meta="©2026 · An AI coding IDE"
      />
    </div>
  )
}


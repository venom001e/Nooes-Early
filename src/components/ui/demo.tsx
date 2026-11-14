import Terminal from "@/components/ui/terminal";

export default function TerminalDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <Terminal
          username="guest"
          hostname="nexus"
          enableSound={false}
          commands={[
            {
              input: "npx create-nexus-app@latest my-app",
              runDelayMs: 900,
              output: [
                { text: "Creating a new Nexus app in ./my-app", tone: "info" },
                { text: "Installing dependencies...", tone: "muted" },
                { text: "Success! Your app is ready.", tone: "success" },
              ],
            },
            {
              input: "cd my-app && npm run dev",
              runDelayMs: 600,
              output: [
                { text: "Local:   http://localhost:3000", tone: "info" },
                { text: "Ready in 340 ms", tone: "success" },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}


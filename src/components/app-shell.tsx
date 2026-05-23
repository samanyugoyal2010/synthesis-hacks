import { BoomerangLogo } from "./landing-page";

type AppShellProps = {
  children: React.ReactNode;
  taskCount?: number;
  mobileTasksOpen?: boolean;
  onToggleMobileTasks?: () => void;
};

export function AppShell({
  children,
  taskCount = 0,
  mobileTasksOpen,
  onToggleMobileTasks,
}: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <BoomerangLogo size={26} />
              <h1 className="font-serif text-lg font-bold tracking-tight text-ink sm:text-xl">
                Boomerang Command
              </h1>
            </a>
            <span className="hidden h-5 w-px bg-border sm:inline" />
            <p className="hidden text-xs text-ink-muted sm:inline mt-0.5 font-medium">
              Autonomous Agent Console
            </p>
          </div>

          {onToggleMobileTasks && (
            <button
              type="button"
              onClick={onToggleMobileTasks}
              className="relative rounded-lg border border-border-strong bg-white px-3 py-1.5 text-xs font-semibold text-ink transition-all hover:bg-surface active:scale-[0.98] lg:hidden"
              aria-expanded={mobileTasksOpen}
              aria-controls="task-panel"
            >
              Tasks
              {taskCount > 0 && (
                <span className="ml-1.5 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {taskCount}
                </span>
              )}
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_360px]">
        {children}
      </main>
    </div>
  );
}


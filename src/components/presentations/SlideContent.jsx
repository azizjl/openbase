import { cn } from "@/lib/utils"

export function SlideContent({ slide, className = "", variant = "light" }) {
  const isDark = variant === "dark"
  const muted = isDark ? "text-white/70" : "text-muted-foreground"
  const foreground = isDark ? "text-white" : "text-foreground"
  const primaryAccent = isDark ? "text-emerald-400" : "text-primary"
  const bulletDot = isDark ? "bg-emerald-400" : "bg-primary"
  const quoteBorder = isDark ? "border-emerald-400" : "border-primary"

  switch (slide.layout) {
    case "title":
      return (
        <div className={cn("flex h-full flex-col items-center justify-center text-center", className)}>
          <h2 className={cn("font-heading text-4xl font-bold tracking-tight md:text-5xl", foreground)}>
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className={cn("mt-4 text-lg md:text-xl", muted)}>{slide.subtitle}</p>
          )}
        </div>
      )

    case "quote":
      return (
        <div className={cn("flex h-full flex-col justify-center px-8", className)}>
          <h2 className={cn("mb-6 font-heading text-2xl font-semibold", foreground)}>{slide.title}</h2>
          <blockquote
            className={cn(
              "border-l-4 pl-6 text-xl italic leading-relaxed md:text-2xl",
              quoteBorder,
              isDark ? "text-white/90" : "text-foreground"
            )}
          >
            "{slide.quote}"
          </blockquote>
          {slide.attribution && <p className={cn("mt-4", muted)}>{slide.attribution}</p>}
        </div>
      )

    case "section":
      return (
        <div className={cn("flex h-full flex-col justify-center px-8", className)}>
          <h2 className={cn("font-heading text-2xl font-semibold", muted)}>{slide.title}</h2>
          <p className={cn("mt-4 font-heading text-3xl font-bold md:text-4xl", primaryAccent)}>
            {slide.sectionTitle}
          </p>
          {slide.body && <p className={cn("mt-6 max-w-2xl text-lg", muted)}>{slide.body}</p>}
        </div>
      )

    default:
      return (
        <div className={cn("flex h-full flex-col justify-center px-8", className)}>
          <h2 className={cn("font-heading text-3xl font-bold md:text-4xl", foreground)}>{slide.title}</h2>
          {slide.bullets?.length > 0 && (
            <ul className={cn("mt-8 space-y-4 text-lg md:text-xl", isDark ? "text-white/90" : "text-foreground")}>
              {slide.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className={cn("mt-2 size-2 shrink-0 rounded-full", bulletDot)} />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )
  }
}

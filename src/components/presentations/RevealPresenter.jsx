import { useEffect, useRef, useState } from "react"
import Reveal from "reveal.js"
import "reveal.js/reveal.css"
import "reveal.js/theme/black.css"
import { PresentSlideCanvas } from "@/components/presentations/PresentSlideCanvas"

export function RevealPresenter({ deck, autoPrint = false, onReady }) {
  const deckRef = useRef(null)
  const revealRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!deckRef.current || !deck?.slides?.length) return

    const reveal = new Reveal(deckRef.current, {
      hash: false,
      controls: true,
      progress: true,
      center: true,
      slideNumber: true,
      transition: "slide",
      width: 1280,
      height: 720,
    })

    reveal.on("slidechanged", (event) => {
      setActiveIndex(event.indexh)
    })

    reveal.initialize().then(() => {
      revealRef.current = reveal
      setActiveIndex(reveal.getIndices().h)
      onReady?.(reveal)

      if (autoPrint) {
        window.setTimeout(() => {
          window.print()
        }, 1200)
      }
    })

    return () => {
      reveal.destroy()
      revealRef.current = null
    }
  }, [deck, autoPrint, onReady])

  useEffect(() => {
    revealRef.current?.layout()
  }, [activeIndex])

  if (!deck) return null

  const activeSlide = deck.slides[activeIndex]

  return (
    <div className="reveal-viewport h-full w-full bg-black">
      <div className="reveal h-full w-full" ref={deckRef}>
        <div className="slides">
          {deck.slides.map((slide, index) => (
            <section key={slide.id} data-background-color="#141414">
              <div className="present-slide-section flex h-full w-full items-center justify-center">
                {index === activeIndex && activeSlide ? (
                  <PresentSlideCanvas
                    key={activeSlide.id}
                    deckId={deck.id}
                    slide={activeSlide}
                  />
                ) : (
                  <div className="present-slide-placeholder h-[720px] w-[1280px] max-w-full max-h-[80vh]" />
                )}
              </div>
              {slide.notes && <aside className="notes">{slide.notes}</aside>}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

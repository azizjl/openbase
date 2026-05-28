import pptxgen from "pptxgenjs"

export async function exportPresentationToPptx(deck) {
  const pptx = new pptxgen()
  pptx.author = deck.author || "OpenBase"
  pptx.title = deck.title
  pptx.layout = "LAYOUT_16x9"

  for (const slide of deck.slides) {
    const s = pptx.addSlide()
    s.background = { color: "141414" }

    switch (slide.layout) {
      case "title":
        s.addText(slide.title, {
          x: 0.6,
          y: 2.2,
          w: 8.8,
          h: 1.2,
          fontSize: 36,
          bold: true,
          color: "FFFFFF",
          fontFace: "Arial",
        })
        if (slide.subtitle) {
          s.addText(slide.subtitle, {
            x: 0.6,
            y: 3.5,
            w: 8.8,
            h: 0.8,
            fontSize: 18,
            color: "AAAAAA",
            fontFace: "Arial",
          })
        }
        break

      case "quote":
        s.addText(slide.title, {
          x: 0.6,
          y: 0.5,
          w: 8.8,
          h: 0.6,
          fontSize: 22,
          bold: true,
          color: "FFFFFF",
        })
        s.addText(`"${slide.quote}"`, {
          x: 0.8,
          y: 1.8,
          w: 8.4,
          h: 2.5,
          fontSize: 20,
          italic: true,
          color: "DDDDDD",
        })
        if (slide.attribution) {
          s.addText(slide.attribution, {
            x: 0.8,
            y: 4.5,
            w: 8.4,
            h: 0.5,
            fontSize: 14,
            color: "888888",
          })
        }
        break

      case "section":
        s.addText(slide.title, {
          x: 0.6,
          y: 0.5,
          w: 8.8,
          h: 0.6,
          fontSize: 22,
          bold: true,
          color: "FFFFFF",
        })
        s.addText(slide.sectionTitle, {
          x: 0.6,
          y: 1.5,
          w: 8.8,
          h: 0.8,
          fontSize: 28,
          bold: true,
          color: "49A052",
        })
        if (slide.body) {
          s.addText(slide.body, {
            x: 0.6,
            y: 2.8,
            w: 8.8,
            h: 1.5,
            fontSize: 16,
            color: "CCCCCC",
          })
        }
        break

      default:
        s.addText(slide.title, {
          x: 0.6,
          y: 0.5,
          w: 8.8,
          h: 0.7,
          fontSize: 28,
          bold: true,
          color: "FFFFFF",
        })
        if (slide.bullets?.length) {
          s.addText(
            slide.bullets.map((b) => ({ text: b, options: { bullet: true, breakLine: true } })),
            {
              x: 0.8,
              y: 1.5,
              w: 8.4,
              h: 4,
              fontSize: 18,
              color: "EEEEEE",
              lineSpacingMultiple: 1.3,
            }
          )
        }
    }

    if (slide.notes) {
      s.addNotes(slide.notes)
    }
  }

  const safeName = deck.title.replace(/[^\w\s-]/g, "").trim() || "presentation"
  await pptx.writeFile({ fileName: `${safeName}.pptx` })
}

export function openPresentationPrintView(id) {
  const url = `${window.location.origin}/presentations/${id}/present?print=1`
  const printWindow = window.open(url, "_blank", "noopener,noreferrer")
  if (!printWindow) {
    window.location.href = url
  }
}

import { Box, createShapeId, toRichText } from "tldraw"
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/lib/slideCanvasKeys"

export { SLIDE_HEIGHT, SLIDE_WIDTH, getSlidePersistenceKey } from "@/lib/slideCanvasKeys"

function getSlideColors(colorScheme) {
  return colorScheme === "dark"
    ? { text: "grey", accent: "green" }
    : { text: "black", accent: "green" }
}

function createTextShape({ x, y, text, size = "m", color = "black", align = "start", w = 832 }) {
  return {
    id: createShapeId(),
    type: "text",
    x,
    y,
    props: {
      richText: toRichText(text),
      size,
      color,
      font: "sans",
      textAlign: align,
      autoSize: false,
      w,
    },
  }
}

function seedSlideFromJson(editor, slide, colorScheme) {
  const colors = getSlideColors(colorScheme)
  const shapes = []

  switch (slide.layout) {
    case "title":
      shapes.push(
        createTextShape({
          x: 64,
          y: 180,
          text: slide.title,
          size: "xl",
          color: colors.text,
          align: "middle",
          w: SLIDE_WIDTH - 128,
        })
      )
      if (slide.subtitle) {
        shapes.push(
          createTextShape({
            x: 64,
            y: 300,
            text: slide.subtitle,
            size: "l",
            color: colors.text,
            align: "middle",
            w: SLIDE_WIDTH - 128,
          })
        )
      }
      break

    case "quote":
      shapes.push(
        createTextShape({
          x: 64,
          y: 48,
          text: slide.title,
          size: "l",
          color: colors.text,
          w: SLIDE_WIDTH - 128,
        }),
        createTextShape({
          x: 96,
          y: 140,
          text: `"${slide.quote}"`,
          size: "l",
          color: colors.text,
          w: SLIDE_WIDTH - 160,
        })
      )
      if (slide.attribution) {
        shapes.push(
          createTextShape({
            x: 96,
            y: 380,
            text: slide.attribution,
            size: "m",
            color: colors.text,
            w: SLIDE_WIDTH - 160,
          })
        )
      }
      break

    case "section":
      shapes.push(
        createTextShape({
          x: 64,
          y: 48,
          text: slide.title,
          size: "m",
          color: colors.text,
          w: SLIDE_WIDTH - 128,
        }),
        createTextShape({
          x: 64,
          y: 120,
          text: slide.sectionTitle,
          size: "xl",
          color: colors.accent,
          w: SLIDE_WIDTH - 128,
        })
      )
      if (slide.body) {
        shapes.push(
          createTextShape({
            x: 64,
            y: 260,
            text: slide.body,
            size: "l",
            color: colors.text,
            w: SLIDE_WIDTH - 128,
          })
        )
      }
      break

    default:
      shapes.push(
        createTextShape({
          x: 64,
          y: 48,
          text: slide.title,
          size: "xl",
          color: colors.text,
          w: SLIDE_WIDTH - 128,
        })
      )
      if (slide.bullets?.length) {
        shapes.push(
          createTextShape({
            x: 80,
            y: 140,
            text: slide.bullets.map((bullet) => `• ${bullet}`).join("\n"),
            size: "l",
            color: colors.text,
            w: SLIDE_WIDTH - 160,
          })
        )
      }
      break
  }

  if (shapes.length > 0) {
    editor.createShapes(shapes)
  }
}

export function fitSlideInView(editor, animation = { duration: 220 }) {
  editor.zoomToBounds(new Box(0, 0, SLIDE_WIDTH, SLIDE_HEIGHT), {
    inset: 48,
    animation,
  })
}

export function setupSlideEditor(editor, slide, { readOnly = false, colorScheme = "light" } = {}) {
  editor.user.updateUserPreferences({ colorScheme })
  editor.updateInstanceState({
    isGridMode: false,
    isReadonly: readOnly,
  })

  if (editor.getCurrentPageShapes().length === 0 && slide) {
    seedSlideFromJson(editor, slide, colorScheme)
  }

  fitSlideInView(editor, readOnly ? { duration: 0 } : { duration: 220 })
}

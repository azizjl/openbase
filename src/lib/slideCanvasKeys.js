export const SLIDE_WIDTH = 960
export const SLIDE_HEIGHT = 540

export function getSlidePersistenceKey(deckId, slideId) {
  return `openbase-presentation-v4-${deckId}-${slideId}`
}

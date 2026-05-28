import { defaultPresentations } from "@/data/presentations"

const STORAGE_KEY = "openbase-presentations"

function readStored() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeStored(decks) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
}

export function getAllPresentations() {
  const stored = readStored()
  const storedIds = new Set(stored.map((d) => d.id))
  const defaults = defaultPresentations.filter((d) => !storedIds.has(d.id))
  return [...stored, ...defaults].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  )
}

export function getPresentationById(id) {
  return getAllPresentations().find((d) => d.id === id) ?? null
}

export function savePresentation(deck) {
  const stored = readStored()
  const index = stored.findIndex((d) => d.id === deck.id)
  const next = { ...deck, updatedAt: new Date().toISOString() }

  if (index >= 0) {
    stored[index] = next
  } else {
    stored.unshift(next)
  }

  writeStored(stored)
  return next
}

export function deletePresentation(id) {
  const stored = readStored().filter((d) => d.id !== id)
  writeStored(stored)
}

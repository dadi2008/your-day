import type { Wish } from '../../common/interfaces/quotes'
import type { Language } from '../../common/types/application'
import type { LocalizedWishes } from '../../common/types/quotes'
import { baseWishes, wishAuthors, wishIntents, wishTemplates } from '../../data/wishes'

export function buildWishes(language: Language): string[] {
  return [
    ...baseWishes[language],
    ...wishTemplates[language].flatMap((template) =>
      wishIntents[language].map((wish) => template.replace('{wish}', wish)),
    ),
  ]
}

export function getWishByIndex(wishes: LocalizedWishes, language: Language, index: number): Wish {
  const text = wishes[language][index]

  if (!text) {
    throw new Error('Wish collection must not be empty')
  }

  return { index, text, author: wishAuthors[language] }
}

export function createWish(wishes: LocalizedWishes, language: Language, previousIndex?: number): Wish {
  const availableIndexes = wishes[language]
    .map((_, index) => index)
    .filter((index) => index !== previousIndex)
  const randomIndex = Math.floor(Math.random() * availableIndexes.length)
  const index = availableIndexes[randomIndex] ?? 0

  return getWishByIndex(wishes, language, index)
}

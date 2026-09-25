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

export function createWish(wishes: LocalizedWishes, language: Language, previousText = ''): Wish {
  const availableWishes = wishes[language].filter((wish) => wish !== previousText)
  const randomIndex = Math.floor(Math.random() * availableWishes.length)
  const text = availableWishes[randomIndex] ?? wishes[language][0]

  if (!text) {
    throw new Error('Wish collection must not be empty')
  }

  return { text, author: wishAuthors[language] }
}

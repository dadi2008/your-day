import { wishAuthors, wishes } from '../../common/constants/wishes'
import type { Wish } from '../../common/interfaces/quotes'
import type { Language } from '../../common/types/application'

export function createWish(language: Language, previousText = ''): Wish {
  const availableWishes = wishes[language].filter((wish) => wish !== previousText)
  const randomIndex = Math.floor(Math.random() * availableWishes.length)
  const text = availableWishes[randomIndex] ?? wishes[language][0]

  if (!text) {
    throw new Error('Wish collection must not be empty')
  }

  return { text, author: wishAuthors[language] }
}

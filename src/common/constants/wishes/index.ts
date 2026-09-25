import type { LocalizedWishes } from 'common/types/quotes'
import { buildWishes } from 'helpers/wishes'

export const wishes: LocalizedWishes = {
  uk: buildWishes('uk'),
  en: buildWishes('en'),
}

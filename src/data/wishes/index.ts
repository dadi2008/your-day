import type { Language } from 'common/types/application'
import type { LocalizedWishes } from 'common/types/quotes'

export const baseWishes: LocalizedWishes = {
  uk: [
    'Нехай сьогодні знайдеться час для того, що наповнює тебе силами.',
    'Бажаю тобі спокою в думках, тепла в серці та добрих новин.',
    'Нехай цей день принесе хоча б одну маленьку радість, яку захочеться запам’ятати.',
    'Бажаю впевнено йти своїм шляхом, навіть якщо він починається з маленького кроку.',
    'Нехай усе важливе складається легко, а зайве залишиться позаду.',
    'Бажаю тобі зустріти сьогодні більше доброти, ніж ти очікуєш.',
    'Нехай у тебе вистачить сил на головне й часу на себе.',
    'Бажаю відчути, що ти саме там, де маєш бути.',
    'Нехай цей день буде лагідним до тебе та щедрим на хороші моменти.',
    'Бажаю зберегти внутрішнє світло, що б не відбувалося навколо.',
    'Нехай сьогоднішні зусилля стануть кроком до твоєї мрії.',
    'Бажаю сміливо обирати те, що робить тебе щасливішим.',
    'Нехай день почнеться з надії, продовжиться натхненням і завершиться вдячністю.',
    'Бажаю тобі людей поруч, з якими можна бути собою.',
    'Нехай сьогодні буде достатньо причин усміхнутися.',
  ],
  en: [
    'May you find time today for the things that restore your strength.',
    'Wishing you a calm mind, a warm heart, and good news.',
    'May this day bring you one small joy worth remembering.',
    'May you walk your own path with confidence, even when it starts with a small step.',
    'Wishing you ease with what matters and space to leave the rest behind.',
    'May you meet more kindness today than you expect.',
    'Wishing you enough energy for what matters and enough time for yourself.',
    'May you feel that you are exactly where you need to be.',
    'May this day be gentle with you and generous with good moments.',
    'Wishing you the strength to keep your inner light, whatever happens around you.',
    'May today’s efforts bring you one step closer to your dream.',
    'Wishing you the courage to choose what makes you happier.',
    'May your day begin with hope, continue with inspiration, and end with gratitude.',
    'Wishing you people around whom you can be yourself.',
    'May today give you plenty of reasons to smile.',
  ],
}

export const wishTemplates: LocalizedWishes = {
  uk: [
    'Нехай сьогодні тобі вдасться {wish}.',
    'Бажаю тобі {wish}.',
    'Хай у твоєму дні знайдеться можливість {wish}.',
    'Нехай буде достатньо часу, щоб {wish}.',
    'Хай сьогодні буде нагода {wish}.',
    'Бажаю, щоб у тебе вийшло {wish}.',
    'Нехай у тебе вистачить сил {wish}.',
    'Хай цей день допоможе тобі {wish}.',
    'Бажаю дозволити собі {wish}.',
    'Нехай сьогодні з’явиться привід {wish}.',
  ],
  en: [
    'May you get a chance to {wish}.',
    'I wish you could {wish}.',
    'May your day make room for you to {wish}.',
    'May you have enough time to {wish}.',
    'May today give you a reason to {wish}.',
    'I hope you get to {wish}.',
    'May you have the strength to {wish}.',
    'May this day help you {wish}.',
    'May you find a quiet moment to {wish}.',
    'May you feel free to {wish}.',
  ],
}

export const wishIntents: LocalizedWishes = {
  uk: [
    'зробити паузу й подбати про себе',
    'помітити маленькі радощі навколо',
    'довіритися власним рішенням',
    'сказати собі добрі слова',
    'знайти опору в тому, що вже є',
    'дати собі право на відпочинок',
    'зробити хоча б один крок до мрії',
    'провести час із близькими по-справжньому тепло',
    'відпустити те, що забирає сили',
    'пишатися своїми маленькими перемогами',
  ],
  en: [
    'take a pause and care for yourself',
    'notice small joys around you',
    'trust your own decisions',
    'say kind words to yourself',
    'find support in what you already have',
    'give yourself permission to rest',
    'take one small step toward your dream',
    'spend truly warm time with people close to you',
    'let go of what drains your energy',
    'feel proud of your small victories',
  ],
}

export const wishAuthors: Record<Language, string> = {
  uk: 'З турботою про тебе',
  en: 'With care for you',
}

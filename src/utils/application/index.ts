import { timeOfDayThresholds } from '../../common/constants/application'
import type { TimeOfDay } from '../../common/types/application'

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= timeOfDayThresholds.evening) return 'evening'
  if (hour >= timeOfDayThresholds.day) return 'day'
  if (hour >= timeOfDayThresholds.morning) return 'morning'

  return 'night'
}

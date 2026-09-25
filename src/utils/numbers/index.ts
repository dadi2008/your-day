export function getRandomNumber(minimum: number, maximum: number): number {
  return minimum + Math.random() * (maximum - minimum)
}

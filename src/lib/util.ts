export function roundPct(num: number) {
  if (isNaN(num)) return 0
  return Math.round(num * 1000) / 100
}
export function round(num: number) {
  if (isNaN(num)) return 0
  return Math.round(num * 10) / 10
}

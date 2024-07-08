export function roundPct(num: number) {
  if (isNaN(num)) return 0
  return Math.round(num * 1000) / 100
}

const uidRegex = /^[0-9]{10}$/

export function match(param) {
  return param === 'x' || uidRegex.test(param)
}

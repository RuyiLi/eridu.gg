const uidRegex = /^[0-9]{9}$/

export function match(param) {
  return param === 'x' || uidRegex.test(param)
}

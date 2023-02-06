/**
 * Converts numbers to their abbreviated form, ie:
 * 12000000 -> 12m
 */
export const intToString = (value: number, minValue = 0) => {
  if (value > minValue) {
    const suffixes = ["", "k", "m", "b", "t"]
    const suffixNum = Math.floor(value.toString().length / 3)
    let shortValue: string | number = parseFloat(
      (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(
        2
      )
    )
    if (shortValue % 1 !== 0) {
      shortValue = shortValue.toFixed(1)
    }
    return `${shortValue}${suffixes[suffixNum]}`
  }
  return `${value}`
}

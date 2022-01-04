/**
 * Adds zeros to the beginning of a string to a specified length
 * @param {number} num The number to be padded
 * @param {number} length The length the number should equal
 * @returns {string} A stringified version of **num**
 */
export const padZeros = (num: number, length: number): string => {
  if (num < 0) {
    const posNum = String(Math.abs(num)).padStart(length, "0")
    return `-${posNum}`
  }

  return String(num).padStart(length, "0")
}

/**
 * Takes in a string/Date and returns a new Date string with correct timezone info
 * @param {string | Date} date A string or a Date without correct timezone info
 * @param {{isURLParam: boolean, minTime: boolean, maxTime: boolean}} optionalArgs
 * @returns A string that contains a Date with a specified timezone
 */
export const localeDateString = (
  date: Date | string,
  optionalArgs: {
    isURLParam?: boolean
    minTime?: boolean
    maxTime?: boolean
  } = { isURLParam: false }
): string => {
  const dateParsed = date instanceof Date ? date : new Date(date)

  if (isNaN(dateParsed.getTime())) throw new Error("Invalid dateParsed")

  const year = dateParsed.getFullYear()
  const month = padZeros(dateParsed.getMonth() + 1, 2)
  const day = padZeros(dateParsed.getDate(), 2)

  const hours =
    (optionalArgs.minTime && padZeros(0, 2)) ||
    (optionalArgs.maxTime && "23") ||
    padZeros(dateParsed.getHours(), 2)
  const mins =
    (optionalArgs.minTime && padZeros(0, 2)) ||
    (optionalArgs.maxTime && "59") ||
    padZeros(dateParsed.getMinutes(), 2)
  const secs =
    (optionalArgs.minTime && padZeros(0, 2)) ||
    (optionalArgs.maxTime && "59") ||
    padZeros(dateParsed.getSeconds(), 2)

  let timezone = "Z"
  if (dateParsed.getTimezoneOffset() !== 0)
    timezone = `${
      dateParsed.getTimezoneOffset() < 0
        ? optionalArgs.isURLParam
          ? "%2b"
          : "+"
        : ""
    }${padZeros(
      -Math.trunc(dateParsed.getTimezoneOffset() / 60),
      2
    )}:${padZeros(((dateParsed.getTimezoneOffset() / 60) % 1) * 60, 2)}`

  return `${year}-${month}-${day}T${hours}:${mins}:${secs}${`${timezone}`}`
}

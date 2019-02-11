import defaultBreakpoints from './defaultBreakpoints'

const getBreakPoints = theme =>
  theme && theme.breakpoints ? theme.breakpoints : defaultBreakpoints

export const getGridProperty = (input, theme, property) => {
  if (typeof input === 'number' || typeof input === 'string') {
    return {
      singleValue: input
    }
  }

  if (typeof input === 'object') {
    if (!Array.isArray(input)) {
      // Input is an object.
      const singleValue =
        property === 'cols'
          ? Math.max(...Object.keys(input).map(width => input[width]))
          : undefined

      return {
        map: input,
        singleValue
      }
    } else {
      // Input is an array.
      const breakpoints = getBreakPoints(theme)
      const breakpointsWidths = Object.keys(breakpoints).map(
        bpName => breakpoints[bpName]
      )
      const map = {}

      breakpointsWidths.forEach((currWidth, idx) => {
        const currItem = input[idx]
        if (currItem != null) {
          map[currWidth] = currItem
        }
      })

      return {
        map,
        singleValue: property === 'cols' ? Math.max(...input) : undefined
      }
    }
  }
}
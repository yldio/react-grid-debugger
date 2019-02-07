import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

/* Default Breakpoints taken from https://github.com/jameslnewell/styled-components-breakpoint */
const defaultBreakpoints = {
  mobile: 0, // targeting all devices
  tablet: 737, // targeting devices that are LARGER than the iPhone 6 Plus (which is 736px in landscape mode)
  desktop: 1025 // targeting devices that are LARGER than the iPad (which is 1024px in landscape mode)
}

const Grid = styled.div`
  display: grid;
  margin: 0 auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.6;
  z-index: 1000;
  pointer-events: none;
  grid-template-columns: repeat(${props => props.cols.maxCols}, 1fr);

  max-width: calc(100% - 48px);

  /* Gutters */
  ${props =>
    props.gutters.singleValue &&
    `
    column-gap: ${props.gutters.singleValue};
  `};

  ${props =>
    props.gutters.map &&
    `
    ${applyGutters(props.gutters.map)}
  `};

    /* Columns */
  ${props =>
    props.cols && props.cols.map &&
    `
    ${applyNumCols(props.cols.map)}
  `};
`

const buildMediaQueryWithRule = (width, rule, mode = 'min') => {
  return `
    @media (${mode}-width: ${width}px) {
      ${rule}
    }
  `
}

const applyGutters = (widthGutterMap) => {
  return Object.keys(widthGutterMap).map(minWidth => {
    const rule = `column-gap: ${widthGutterMap[minWidth]}`

    return buildMediaQueryWithRule(minWidth, rule)
  }).join('\n')
}

const applyNumCols = (widthNumColsMap) => {
  return Object.keys(widthNumColsMap).map(minWidth => {
    // const rule = ` div:nth-child(n+${widthNumColsMap[minWidth] + 1}) { display: none }`
    const rule = `grid-template-columns: repeat(${widthNumColsMap[minWidth]}, 1fr);`
    // const rule = ` background: red`

    return buildMediaQueryWithRule(minWidth, rule)
  }).join('\n')
}

const Col = styled.div`
  width: 100%;
  height: 100vh;
  background: #d8fff7;
  border-left: 1px solid #31ffde;
  border-right: 1px solid #31ffde; 
`

const getGuttersObject = (gutters, theme) => {
  if (typeof gutters === 'string') {
    return {
      singleValue: gutters
    }
  }

  if (typeof gutters === 'object') {
    if (!Array.isArray(gutters)) {
      return {
        map: gutters
      }
    } else {
      const breakpoints = getBreakPoints(theme)
      const breakpointsWidths = Object.keys(breakpoints).map((bpName) => breakpoints[bpName])
      const map = {}

      breakpointsWidths.forEach((currWidth, idx) => {
        const gutter = gutters[idx]
        if (currWidth != null) {
          map[currWidth] = gutter
        }
      })

      return {
        map
      }
    }
  }

  return {}
}

const getBreakPoints = (theme) => theme && theme.breakpoints ? theme.breakpoints : defaultBreakpoints

const getColsObject = (numCols, theme) => {
  if (typeof numCols === 'number') {
    return {
      maxCols: numCols
    }
  }

  if (typeof numCols === 'object') {
    if (!Array.isArray(numCols)) {
      const colsArray = Object.keys(numCols).map(width => numCols[width])

      return {
        map: numCols,
        maxCols: Math.max(...colsArray)
      }
    } else {
      const breakpoints = getBreakPoints(theme)
      const breakpointsWidths = Object.keys(breakpoints).map((bpName) => breakpoints[bpName])
      const map = {}

      breakpointsWidths.forEach((currWidth, idx) => {
        const numCol = numCols[idx]
        if (numCol != null) {
          map[currWidth] = numCol
        }
      })

      return {
        maxCols: Math.max(...numCols),
        map
      }
    }
  }
}

export default class GridDebugger extends Component {
  static propTypes = {
    gutters: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string
    ]).isRequired,
    maxWidth: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string
    ]),
    numCols: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ]).isRequired,
    theme: PropTypes.object
  };

  render() {
    const { gutters: providedGutters, maxWidth, numCols } = this.props
    const gutters = getGuttersObject(providedGutters, this.props.theme)
    const cols = getColsObject(numCols)

    console.log({ cols });

    console.log(gutters, maxWidth, numCols, cols.maxCols)

    return (
      <Grid
        gutters={gutters}
        cols={cols}>
        { Array.from(new Array(cols.maxCols)).map((el, idx) => (
          <Col key={idx} />
        ))
        }
      </Grid>
    )
  }
}

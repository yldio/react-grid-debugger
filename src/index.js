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
  grid-template-columns: repeat(${props => props.numCols}, 1fr);

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
`

const buildMediaQueryWithRule = (minWidth, rule) => {
  return `
    @media (min-width: ${minWidth}px) {
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
      const breakpoints = theme && theme.breakpoints ? theme.breakpoints : defaultBreakpoints
      const breakpointsWidths = Object.keys(breakpoints).map((bpName) => breakpoints[bpName])
      const map = {}

      gutters.forEach((gutter, idx) => {
        const currWidth = breakpointsWidths[idx]
        if (currWidth != null) {
          map[currWidth] = gutter
        }
      })

      console.log({ map });
      return {
        map,
      }
    }
  }

  return {}
}

export default class GridDebugger extends Component {
  static propTypes = {
    gutters: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string
    ]),
    maxWidth: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.string
    ]),
    numCols: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.number
    ])
  };

  render() {
    const { gutters: providedGutters, maxWidth, numCols } = this.props
    const gutters = getGuttersObject(providedGutters, this.props.theme)
    
    console.log(gutters, maxWidth, numCols)
    
    return (
      <Grid
        gutters={ gutters }
        numCols={this.props.numCols}>
        { Array.from(new Array(12)).map((el, idx) => (
          <Col key={idx} />
        ))
        }
      </Grid>
    )
  }
}

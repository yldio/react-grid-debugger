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
  box-sizing: content-box;
  margin: 0 auto;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.6;
  z-index: 1000;
  pointer-events: none;
  grid-template-columns: repeat(${props => props.cols.singleValue}, 1fr);

  /* Side Margins */
  ${props =>
    props.gutters &&
    props.gutters.singleValue &&
    `
    padding: 0 ${props.gutters.singleValue};
  `};

  ${props =>
    props.gutters &&
    props.gutters.map &&
    `
    ${applySideMargins(props.gutters.map)}
  `};

  /* Gutters */
  ${props =>
    props.gutters &&
    props.gutters.singleValue &&
    `
    column-gap: ${props.gutters.singleValue};
  `};

  ${props =>
    props.gutters &&
    props.gutters.map &&
    `
    ${applyGutters(props.gutters.map)}
  `};

  /* Columns */
  ${props =>
    props.cols &&
    props.cols.map &&
    `
    ${applyNumCols(props.cols.map)}
  `};

  /* Max-Width */
  ${props =>
    props.maxWidth &&
    props.maxWidth.singleValue &&
    `
    max-width: ${props.maxWidth.singleValue};
  `};

  ${props =>
    props.maxWidth &&
    props.maxWidth.map &&
    `
    ${applyMaxWidth(props.maxWidth.map)}
  `};
`

const buildMediaQueryWithRule = (width, rule, mode = 'min') => {
  return `
    @media (${mode}-width: ${width}px) {
      ${rule}
    }
  `
}

const applySideMargins = widthMarginMap => {
  return Object.keys(widthMarginMap)
    .map(minWidth => {
      const rule = `padding: 0 ${widthMarginMap[minWidth]};`

      return buildMediaQueryWithRule(minWidth, rule)
    })
    .join('\n')
}

const applyGutters = widthGutterMap => {
  return Object.keys(widthGutterMap)
    .map(minWidth => {
      const rule = `column-gap: ${widthGutterMap[minWidth]};`

      return buildMediaQueryWithRule(minWidth, rule)
    })
    .join('\n')
}

const applyNumCols = widthNumColsMap => {
  return Object.keys(widthNumColsMap)
    .map(minWidth => {
      const rule = `grid-template-columns: repeat(${
        widthNumColsMap[minWidth]
      }, 1fr);`

      return buildMediaQueryWithRule(minWidth, rule)
    })
    .join('\n')
}

const applyMaxWidth = widthMaxWidthMap => {
  return Object.keys(widthMaxWidthMap)
    .map(minWidth => {
      const rule = `max-width: ${widthMaxWidthMap[minWidth]};`

      return buildMediaQueryWithRule(minWidth, rule)
    })
    .join('\n')
}

const Col = styled.div`
  width: 100%;
  height: 100vh;
  background: #d8fff7;
  border-left: 1px solid #31ffde;
  border-right: 1px solid #31ffde;

  border-left: 1px solid #31ffde;
  border-right: 1px solid #31ffde;
  background: #dc4848;
`

const getBreakPoints = theme =>
  theme && theme.breakpoints ? theme.breakpoints : defaultBreakpoints

const getObject = (input, theme, type) => {
  if (typeof input === 'number' || typeof input === 'string') {
    return {
      singleValue: input
    }
  }

  if (typeof input === 'object') {
    if (!Array.isArray(input)) {
      // Input is an object.
      const singleValue =
        type === 'cols'
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
        singleValue: type === 'cols' ? Math.max(...input) : undefined
      }
    }
  }
}

export default class GridDebugger extends Component {
  static propTypes = {
    show: PropTypes.bool,
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
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKey)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKey)
  }

  constructor(props) {
    super(props)

    this.state = {
      showGrid: !!props.show
    }
  }

  render() {
    const {
      theme,
      gutters,
      maxWidth,
      numCols
    } = this.props
    const guttersObject = getObject(gutters, this.props.theme)
    const cols = getObject(numCols, theme, 'cols')
    const maxWidthObj = maxWidth
      ? getObject(maxWidth, theme)
      : { singleValue: 'none' }

    return this.state.showGrid ? (
      <Grid
        gutters={guttersObject}
        cols={cols}
        maxWidth={maxWidthObj}
      >
        {Array.from(new Array(cols.singleValue)).map((_, idx) => (
          <Col key={idx} />
        ))}
      </Grid>
    ) : null
  }

  handleKey = ev => {
    if (ev.key === 'g' && ev.ctrlKey) {
      this.setState({
        showGrid: !this.state.showGrid
      })
    }
  }
}

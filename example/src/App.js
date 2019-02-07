import React, { Component } from 'react'
import { ThemeProvider } from 'emotion-theming'
import GridDebugger from 'grid-debugger'

const theme = {
  colors: {
    primary: 'hotpink'
  }
}


export default class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
      <div>
        {/* <GridDebugger numCols={12} gutters="40px" /> */}
        {/* <GridDebugger numCols={12} gutters={{ 320: '2rem', 680: '40px', 800: '50px'}} /> */}
        <GridDebugger numCols={12} gutters={['2rem', '40px', '50px', '1000px']} />
      </div>
      </ThemeProvider>
    )
  }
}

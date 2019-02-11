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
        {/* <GridDebugger numCols={12} gutters={['2rem', '40px', '50px', '1000px']} /> */}
        {/* <GridDebugger numCols={[1, 4, 7]} gutters={{ 320: '2rem', 680: '40px', 800: '50px'}} /> */}
        {/* <GridDebugger maxWidth={'400px'} numCols={[1, 4, 12]} gutters={{ 320: '2rem', 680: '40px', 800: '50px'}} /> */}
        {/* <GridDebugger maxWidth={['280px', '600px', '1000px']} numCols={[1, 4, 12]} gutters={{ 320: '2rem', 680: '40px', 800: '50px'}} /> */}
        <GridDebugger 
          show
          maxWidth={'1000px'} 
          numCols={[1, 4, 12]} 
          gutter={{ 320: '2rem', 680: '40px', 800: '50px'}} 
          />
      </div>
      </ThemeProvider>
    )
  }
}

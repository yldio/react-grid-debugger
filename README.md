# react-grid-debugger

> Visual Tool for debugging grid-based layouts

![Grid Debugger Demo](./grid.gif)

[![NPM](https://img.shields.io/npm/v/react-grid-debugger.svg)](https://www.npmjs.com/package/react-grid-debugger) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table of Contents

- [Motivation](#motivation)
- [Install](#install)
- [Usage](#usage)
- [Props](#props)
- [Should this be a dependency or a devDependency?](#should-this-be-a-dependency-or-a-devdependency?)
- [License](#license)


## Motivation
A layout based on a grid system can be something hard to visually debug: proportions, alignments and gutters may vary from project to project and making sure that each layout is well implemented takes both developer and designer time.

This is a visual tool based on a React component that adds a grid overlay on top of our current page, making it easier to see if the number of columns, spacings, etc are up to spec.


## Install

```bash
npm install --save react-grid-debugger
or
yarn add grid-debuger
```

Please check [Should this be a dependency or a devDependency?](#should-this-be-a-dependency-or-a-devdependency?) to understand if you need it as a dev dependency or not

## Usage

`react-grid-debugger` is a react component, so you can use it like you'd use any other component.

It accepts a `theme` prop so if your project uses [styled-components](https://github.com/styled-components/styled-components)/[emotion](https://github.com/emotion-js/emotion) and you have defined the `breakpoints` for your theme, you can pass it into the debugger.

```jsx
import React, { Component } from 'react'

import GridDebugger from 'react-grid-debugger'

export default class App extends Component {
  render () {
    return (
      <main> 
        <GridDebugger 
          show
          maxWidth={'1000px'} 
          theme={myAppTheme}
          numCols={[1, 4, 12]} 
          gutter={{ 320: '2rem', 680: '40px', 800: '50px'}} 
          />
      </main>
    )
  }
}
```

### Toggling the debugger
Pressing keys `Ctrl` and `g` simultaneously toggles the debugger visibility.

### More configuration examples:
```js
<GridDebugger numCols={12} gutter="40px" />
<GridDebugger numCols={12} gutter={{ 320: '2rem', 680: '40px', 800: '50px'}} />
<GridDebugger numCols={12} gutter={['2rem', '40px', '50px', '1000px']} />
<GridDebugger numCols={[1, 4, 7]} gutter={{ 320: '2rem', 680: '40px', 800: '50px'}} />
<GridDebugger maxWidth={'400px'} numCols={[1, 4, 12]} gutter={{ 320: '2rem', 680: '40px', 800: '50px'}} />
<GridDebugger maxWidth={['280px', '600px', '1000px']} numCols={[1, 4, 12]} gutter={{ 320: '2rem', 680: '40px', 800: '50px'}} />
```

## Props

Note that most of the props accept:
- `string | number`: for indicating a single value for that prop.
- `array`: an array (of numbers or strings) that should be used as values, ordered by breakpoints. This means that the first element of the array will be used for the first breakpoint, the second one for the second breakpoint, and so on. If no `theme` is provided to the debugger, the [default breakpoints](./src/defaultBreakpoints.js) are used. If the number of values provided is bigger than the number of breakpoints, the remaining ones are discarded.
- `object`: an object where each key represents a screen width and its property represents the value that should be used for that breakpoint.

| Prop | Type | Required |Description |
|------|----------|------|-------------|
| show | `bool` | No | wether the debugger should be initially visible (it can be toggled with `ctrl + g`) |
| theme |  No | `object` | represents the app theme, normally provided by a `ThemeProvider`, if you [styled-components](https://github.com/styled-components/styled-components)/[emotion](https://github.com/emotion-js/emotion) |
| maxWidth | `string | array | object` | No  | grid maximum width |
| numCols | `number | array | object`  | Yes | number of columns |
| gutter | `string | array | object` | Yes | gutter size |


## Should this be a dependency or a devDependency?

It's really up to you. You might want to just have it available locally and not worry abound bundling it, or you may want it to be available on a specific environment. If you do make it available in a prod build, make sure to use a separate chunk for it and only request it if really needed.

## License

MPL-2.0

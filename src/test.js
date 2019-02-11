import React from 'react'
import renderer from 'react-test-renderer'

import GridDebugger from '../src/index'

it('renders <GridDebugger /> with single value props correctly', () => {
  const tree = renderer.create(
    <GridDebugger 
      show
      maxWidth={'1000px'}
      numCols={12}
      gutter={'4rem'}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <GridDebugger /> with object props correctly', () => {
  const tree = renderer.create(
    <GridDebugger 
      show
      maxWidth={{ 320: '300px', 580: 'none', 800: '1000px' }}
      numCols={{ 320: 1, 680: 2, 800: 12 }}
      gutter={{ 320: '2rem', 680: '40px', 800: '50px' }}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders <GridDebugger /> with array props correctly', () => {
  const tree = renderer.create(
    <GridDebugger
      show
      maxWidth={['280px', '600px', '1000px']}
      numCols={[1, 4, 12]}
      gutter={['2rem', '40px', '50px', '1000px']}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

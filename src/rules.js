const buildMediaQueryWithRule = (width, rule, mode = 'min') => {
  return `
    @media (${mode}-width: ${width}px) {
      ${rule}
    }
  `
}

export const applySideMargins = widthMarginMap => {
  return Object.keys(widthMarginMap)
    .map(minWidth => {
      const rule = `padding: 0 ${widthMarginMap[minWidth]};`

      return buildMediaQueryWithRule(minWidth, rule)
    })
    .join('\n')
}

export const applyGutters = widthGutterMap => {
  return Object.keys(widthGutterMap)
    .map(minWidth => {
      const rule = `column-gap: ${widthGutterMap[minWidth]};`

      return buildMediaQueryWithRule(minWidth, rule)
    })
    .join('\n')
}

export const applyNumCols = widthNumColsMap => {
  return Object.keys(widthNumColsMap)
    .map(minWidth => {
      const rule = `grid-template-columns: repeat(${
        widthNumColsMap[minWidth]
      }, 1fr);`

      return buildMediaQueryWithRule(minWidth, rule)
    })
    .join('\n')
}

export const applyMaxWidth = widthMaxWidthMap => {
  return Object.keys(widthMaxWidthMap)
    .map(minWidth => {
      const rule = `max-width: ${widthMaxWidthMap[minWidth]};`

      return buildMediaQueryWithRule(minWidth, rule)
    })
    .join('\n')
}

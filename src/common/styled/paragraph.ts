import styled from 'styled-components'

export const P = styled.p<{
  margin?: string
  padding?: string
  width?: string
  fontSize?: string
  fontWeight?: number
  whiteSpace?: string
  overflow?: string
  textOverflow?: string
  textDecoration?: string
  cursor?: string
  color?: string
}>`
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  width: ${({ width }) => (width ? width : 'auto')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 'auto')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  text-decoration: ${({ textDecoration }) =>
    textDecoration ? textDecoration : 'none'};
  cursor: ${({ cursor }) => (cursor ? cursor : 'auto')};
  color: ${({ color }) => color || '#000'};
`

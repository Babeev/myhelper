import styled from 'styled-components'

export const StyledP = styled.p<{
  padding?: string
  fontSize?: string
  fontWeight?: number
  whiteSpace?: string
  overflow?: string
  textOverflow?: string
  textDecoration?: string
  cursor?: string
  color?: string
}>`
  margin: 0;
  padding: ${({ padding }) => padding || 0};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 'auto')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'normal')};
  text-decoration: ${({ textDecoration }) =>
    textDecoration ? textDecoration : 'none'};
  cursor: ${({ cursor }) => (cursor ? cursor : 'auto')};
  color: ${({ color }) => color || '#000'};
`

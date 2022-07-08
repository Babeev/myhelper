import styled from 'styled-components'

export const FlexContainer = styled.div<{
  column?: boolean
  margin?: string
  padding?: string
  cursor?: 'pointer' | 'auto'
  isWrap?: boolean
  width?: string
  height?: string
}>`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  margin: ${({ margin }) => margin || '0'};
  padding: ${({ padding }) => padding || '0'};
  cursor: ${({ cursor }) => cursor || 'auto'};
  flex-wrap: ${({ isWrap }) => (isWrap ? 'wrap' : 'no-wrap')};
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
`

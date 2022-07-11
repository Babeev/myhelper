import styled from 'styled-components'

export const StyledImg = styled.img<{
  margin?: string
  padding?: string
  width?: string
  height?: string
  cursor?: string
  hoverOpacity?: string
}>`
  margin: ${({ margin }) => margin || 0};
  width: ${({ width }) => width || 'auto'};
  width: ${({ height }) => height || 'auto'};
  cursor: ${({ cursor }) => cursor || 'auto'};

  &:hover {
    opacity: ${({ hoverOpacity }) => hoverOpacity || 1};
  }
`

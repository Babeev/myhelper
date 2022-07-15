import styled from 'styled-components'

export const StyledImg = styled.img<{
  padding?: string
  width?: string
  height?: string
  cursor?: string
  borderRadius?: string
  hoverOpacity?: string
}>`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  cursor: ${({ cursor }) => cursor || 'auto'};
  border-radius: ${({ borderRadius }) => borderRadius || 0};

  &:hover {
    opacity: ${({ hoverOpacity }) => hoverOpacity || 1};
  }
`

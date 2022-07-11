import styled from 'styled-components'

export const StyledImg = styled.img<{
  padding?: string
  width?: string
  height?: string
  cursor?: string
  hoverOpacity?: string
}>`
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  cursor: ${({ cursor }) => cursor || 'auto'};

  &:hover {
    opacity: ${({ hoverOpacity }) => hoverOpacity || 1};
  }
`

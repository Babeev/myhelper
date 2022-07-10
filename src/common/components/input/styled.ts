import { DANGER_COLOR, GRAY_COLOR } from 'common/constants'
import styled from 'styled-components'

export const InputContainer = styled.div<{
  margin?: string
  width?: string
  height?: string
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: ${({ margin }) => margin || 0};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
`

export const InputLabel = styled.label<{
  paddingLeft?: string
  focused: boolean
  error?: string | null
}>`
  position: absolute;
  top: 25%;
  left: ${({ paddingLeft }) => paddingLeft || '0.85rem'};
  transition: all 0.2s ease;
  z-index: 1;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;

  color: ${({ error }) => (error ? DANGER_COLOR : GRAY_COLOR)};

  ${({ focused }) =>
    focused &&
    `
        font-size: 13px;
        transform: translateY(-100%) translateX(-5px);
        z-index: 1;
        background: white;
        padding: 0 8px;
        border-radius: 30px;
      `}
`

export const StyledInput = styled.input<{
  error: string | null
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
}>`
  border: 2px solid ${({ error }) => (error ? DANGER_COLOR : GRAY_COLOR)};
  border-radius: 0.45rem;
  background-color: #fff;
  outline: none;
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0.75rem')};
  padding-right: ${({ paddingRight }) =>
    paddingRight ? paddingRight : '0.25rem'};
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : '0.75rem'};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0.9rem')};
  font-size: 1rem;
  transition: all 0.2s ease;
  z-index: 0;
`

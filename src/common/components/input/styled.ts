import { BACKGROUND_COLOR, DANGER_COLOR, GRAY_COLOR } from 'common/constants'
import styled from 'styled-components'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &:focus-within > label {
    font-size: 14px;
    transform: translateY(-100%) translateX(-5px);
    background: ${BACKGROUND_COLOR};
    padding: 0 8px;
    border-radius: 30px;
    z-index: 2;
  }
`

export const InputLabel = styled.label<{
  paddingLeft?: string
  error?: string | null
  isValueExist?: boolean
}>`
  position: absolute;
  top: 25%;
  left: ${({ paddingLeft }) => paddingLeft || '0.85rem'};
  transition: all 0.2s ease;
  z-index: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;

  color: ${({ error }) => (error ? DANGER_COLOR : GRAY_COLOR)};

  ${({ isValueExist }) =>
    isValueExist
      ? `
        font-size: 14px;
        transform: translateY(-100%) translateX(-5px);
        background: ${BACKGROUND_COLOR};
        padding: 0 8px;
        border-radius: 30px;
        z-index: 2;
        `
      : ''}
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
  background-color: transparent;
  outline: none;
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0.75rem')};
  padding-right: ${({ paddingRight }) =>
    paddingRight ? paddingRight : '0.25rem'};
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : '0.75rem'};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0.9rem')};
  font-size: 1rem;
  transition: all 0.2s ease;
  z-index: 1;
`

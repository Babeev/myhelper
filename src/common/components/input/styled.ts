import styled from 'styled-components'
import { COLORS } from 'utils/constants'

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  &:focus-within > label {
    font-size: 14px;
    transform: translateY(-100%) translateX(-5px);
    background: ${COLORS.BACKGROUND};
    padding: 0 8px;
    border-radius: 30px;
    z-index: 2;
  }
`

export const InputLabel = styled.label<{
  error?: string | null
  isValueExist?: boolean
}>`
  position: absolute;
  top: 25%;
  left: 0.85rem;
  transition: all 0.2s ease;
  z-index: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;

  color: ${({ error }) => (error ? COLORS.DANGER : COLORS.GRAY)};

  ${({ isValueExist }) =>
    isValueExist
      ? `
        font-size: 14px;
        transform: translateY(-100%) translateX(-5px);
        background: ${COLORS.BACKGROUND};
        padding: 0 8px;
        border-radius: 30px;
        z-index: 2;
        `
      : ''}
`

export const StyledInput = styled.input<{
  error: string | null
}>`
  border: 2px solid ${({ error }) => (error ? COLORS.DANGER : COLORS.GRAY)};
  border-radius: 0.45rem;
  background-color: transparent;
  outline: none;
  padding-top: 0.75rem;
  padding-right: 0.25rem;
  padding-bottom: 0.75rem;
  padding-left: 0.9rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  z-index: 1;
`

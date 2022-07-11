import styled from 'styled-components'

export const Button = styled.button<{
  color: string
  padding?: string
}>`
  background-color: ${({ color }) => color};
  padding: ${({ padding }) => (padding ? padding : 'auto')};
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`

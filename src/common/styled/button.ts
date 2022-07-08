import styled from 'styled-components'

export const Button = styled.button<{
  color: string
  width?: string
  margin?: string
  padding?: string
}>`
  background-color: ${({ color }) => color};
  width: ${({ width }) => (width ? width : '8rem')};
  margin: ${({ margin }) => (margin ? margin : '0 auto')};
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

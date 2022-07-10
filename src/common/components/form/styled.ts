import styled from 'styled-components'

export const StyledForm = styled.form<{
  margin?: string
  padding?: string
  width?: string
  flexDirection?: string
}>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  background-color: 'transparent';
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  width: ${({ width }) => width || 'auto'};
`

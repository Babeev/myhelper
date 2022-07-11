import styled from 'styled-components'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import arrow from 'assets/icons/arrow-left.svg'

interface ReturnButtonProps {
  onClickHandler: () => void
}

const Img = styled.img`
  margin: auto;
  width: 2rem;
  cursor: pointer;
  filter: invert(26%) sepia(92%) saturate(3911%) hue-rotate(214deg)
    brightness(104%) contrast(98%);

  &:hover {
    opacity: 0.7;
  }
`

export const ReturnButton = ({ onClickHandler }: ReturnButtonProps) => {
  return (
    <StyledFlexContainer
      position="absolute"
      column
      height="100%"
      padding="0 1rem"
    >
      <Img src={arrow} onClick={onClickHandler} />
    </StyledFlexContainer>
  )
}

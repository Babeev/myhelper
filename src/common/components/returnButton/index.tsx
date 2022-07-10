import { FlexContainer } from 'common/styled/flexContainer'
import styled from 'styled-components'
import arrow from 'common/assets/icons/arrow-left.svg'

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
    <FlexContainer position="absolute" column width="3rem" height="100%">
      <Img src={arrow} onClick={onClickHandler} />
    </FlexContainer>
  )
}

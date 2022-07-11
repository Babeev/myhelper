import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledImg } from 'common/styled/styledImg'
import plus from 'assets/icons/plus-circle.svg'

interface OptionsProps {
  onOpenHandler: () => void
}

export const Options = ({ onOpenHandler }: OptionsProps) => {
  return (
    <StyledFlexContainer padding="1rem">
      <StyledImg
        src={plus}
        cursor="pointer"
        hoverOpacity="0.7"
        width="25px"
        height="25px"
        onClick={onOpenHandler}
      />
    </StyledFlexContainer>
  )
}

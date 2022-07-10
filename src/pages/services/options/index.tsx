import { FlexContainer } from 'common/styled/flexContainer'
import { Img } from 'common/styled/img'
import plus from 'common/assets/icons/plus-circle.svg'

interface OptionsProps {
  onOpenHandler: () => void
}

export const Options = ({ onOpenHandler }: OptionsProps) => {
  return (
    <FlexContainer padding="1rem">
      <Img
        src={plus}
        cursor="pointer"
        hoverOpacity="0.7"
        width="25px"
        height="25px"
        onClick={onOpenHandler}
      />
    </FlexContainer>
  )
}

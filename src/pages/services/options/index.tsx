import { memo } from 'react'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledImg } from 'common/styled/styledImg'
import { StyledP } from 'common/styled/styledP'
import plus from 'assets/icons/plus-circle.svg'

interface OptionsProps {
  onOpenHandler: () => void
  onChangeDealsPartHandler: (part: 'all' | 'my') => void
  dealsPart: 'all' | 'my'
}

export const Options = memo(
  ({ onOpenHandler, onChangeDealsPartHandler, dealsPart }: OptionsProps) => {
    return (
      <StyledFlexContainer
        padding="1rem"
        justifyContent="space-between"
        gap="1rem"
      >
        <StyledP
          textDecoration={dealsPart === 'all' ? 'underline' : 'none'}
          onClick={() => onChangeDealsPartHandler('all')}
          cursor="pointer"
        >
          Все
        </StyledP>

        <StyledP
          textDecoration={dealsPart === 'my' ? 'underline' : 'none'}
          onClick={() => onChangeDealsPartHandler('my')}
          cursor="pointer"
        >
          Мои
        </StyledP>

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
)

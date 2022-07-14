import { memo } from 'react'
import { Deal } from 'types'
import { useAppSelector } from 'redux/hooks'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledImg } from 'common/styled/styledImg'
import pencil from 'assets/icons/pencil.svg'

interface ServiceOptionsProps {
  deal: Deal
  onOpenHandler: () => void
}

export const ServiceOptions = memo(
  ({ deal, onOpenHandler }: ServiceOptionsProps) => {
    const userId = useAppSelector((state) => state.account.userId)

    return (
      <StyledFlexContainer
        padding="1rem"
        justifyContent="space-between"
        gap="1rem"
      >
        {userId === deal?.ownerId && (
          <StyledImg
            src={pencil}
            cursor="pointer"
            hoverOpacity="0.7"
            width="25px"
            height="25px"
            onClick={onOpenHandler}
          />
        )}
      </StyledFlexContainer>
    )
  }
)

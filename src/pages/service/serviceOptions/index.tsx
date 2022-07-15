import { memo } from 'react'
import { Deal } from 'types'
import { useAppSelector } from 'redux/hooks'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledImg } from 'common/styled/styledImg'
import pencil from 'assets/icons/pencil.svg'
import trash from 'assets/icons/trash.svg'

interface ServiceOptionsProps {
  deal: Deal
  onOpenModalEdit: () => void
  onOpenModalDelete: () => void
}

export const ServiceOptions = memo(
  ({ deal, onOpenModalEdit, onOpenModalDelete }: ServiceOptionsProps) => {
    const userId = useAppSelector((state) => state.account.userId)

    return (
      <StyledFlexContainer
        padding="1rem"
        justifyContent="space-between"
        gap="1rem"
      >
        {userId === deal?.ownerId && (
          <>
            <StyledImg
              src={pencil}
              cursor="pointer"
              hoverOpacity="0.7"
              width="25px"
              height="25px"
              onClick={onOpenModalEdit}
            />

            <StyledImg
              src={trash}
              cursor="pointer"
              hoverOpacity="0.7"
              width="25px"
              height="25px"
              onClick={onOpenModalDelete}
            />
          </>
        )}
      </StyledFlexContainer>
    )
  }
)

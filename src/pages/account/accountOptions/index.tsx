import { memo } from 'react'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledImg } from 'common/styled/styledImg'
import trash from 'assets/icons/trash.svg'

interface AccountOptionsProps {
  onOpenModalDelete: () => void
}

export const AccountOptions = memo(
  ({ onOpenModalDelete }: AccountOptionsProps) => (
    <StyledFlexContainer
      padding="1rem"
      justifyContent="space-between"
      gap="1rem"
    >
      <StyledImg
        src={trash}
        cursor="pointer"
        hoverOpacity="0.7"
        width="25px"
        height="25px"
        onClick={onOpenModalDelete}
      />
    </StyledFlexContainer>
  )
)

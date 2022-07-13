import { memo } from 'react'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledP } from 'common/styled/styledP'
import { Deal } from 'types'

interface ServiceRowProps {
  service: Deal
}

export const ServiceRow = memo(({ service }: ServiceRowProps) => {
  return (
    <StyledFlexContainer
      padding="1rem 1rem 1.5rem 2rem"
      borderRadius="30px"
      hoverOpacity={0.7}
      cursor="pointer"
      backgroundColor="#fff"
      gap="2rem"
      justifyContent="space-between"
    >
      <StyledFlexContainer column cursor="pointer" gap="2rem">
        <StyledP fontSize="1.5rem" fontWeight={500} cursor="pointer">
          {service.name}
        </StyledP>

        <StyledP fontSize="1" cursor="pointer">
          {service.description}
        </StyledP>
      </StyledFlexContainer>

      <StyledFlexContainer alignItems="center">
        <StyledP cursor="pointer" fontWeight={500}>
          {service.price} &#x20bd;
        </StyledP>
      </StyledFlexContainer>
    </StyledFlexContainer>
  )
})

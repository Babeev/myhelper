import { FlexContainer } from 'common/styled/flexContainer'
import { P } from 'common/styled/paragraph'
import { Deal } from 'common/types'

interface ServiceRowProps {
  service: Deal
}

export const ServiceRow = ({ service }: ServiceRowProps) => {
  return (
    <FlexContainer
      padding="1rem 1rem 1.5rem 2rem"
      borderRadius="30px"
      hoverOpacity={0.7}
      cursor="pointer"
      backgroundColor="#fff"
      gap="2rem"
    >
      <FlexContainer column cursor="pointer" gap="2rem">
        <P fontSize="1.5rem" fontWeight={500} cursor="pointer">
          {service.name}
        </P>

        <P fontSize="1" cursor="pointer">
          {service.description}
        </P>
      </FlexContainer>

      <FlexContainer alignItems="center">
        <P cursor="pointer" fontWeight={500}>
          {service.price} &#x20bd;
        </P>
      </FlexContainer>
    </FlexContainer>
  )
}

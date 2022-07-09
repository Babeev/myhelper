import { FlexContainer } from 'common/styled/flexContainer'
import { P } from 'common/styled/paragraph'
import { Deal } from '../servicesEndpoint'

interface ServiceRowProps {
  service: Deal
}

export const ServiceRow = ({ service }: ServiceRowProps) => {
  return (
    <FlexContainer
      padding="1rem 1rem 1.5rem 2rem"
      borderRadius="30px"
      margin="0 0 0.5rem 0"
      hoverOpacity={0.7}
      cursor="pointer"
      backgroundColor="#fff"
    >
      <FlexContainer column margin="0 auto 0 0" cursor="pointer">
        <P
          fontSize="1.5rem"
          fontWeight={500}
          margin="0 auto 1rem 0"
          cursor="pointer"
        >
          {service.name}
        </P>

        <P fontSize="1" cursor="pointer">
          {service.description}
        </P>
      </FlexContainer>

      <P margin="auto 0" cursor="pointer" fontWeight={500}>
        {service.price} &#x20bd;
      </P>
    </FlexContainer>
  )
}

import { FlexContainer } from 'common/styled/flexContainer'
import { ProtectedRoute } from 'features/protectedRoute'
import { memo, useEffect } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { ServiceRow } from './serviceRow'
import { useGetServicesQuery } from './servicesEndpoint'

interface ServicesProps {
  isLoggedIn: boolean
}

const Header = styled.h1`
  font-size: 2rem;
  margin: 0 auto 0 0;
`

export const Services = memo(({ isLoggedIn }: ServicesProps) => {
  const { data, isError, error } = useGetServicesQuery()

  useEffect(() => {
    if (isError) {
      toast.error('Не удалось получить список услуг')

      console.log(error)
    }
  }, [isError, error])

  return (
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <FlexContainer column padding="3rem">
        <FlexContainer margin="0 0 2rem 0">
          <Header>Услуги</Header>
        </FlexContainer>

        <FlexContainer column>
          {data?.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </FlexContainer>
      </FlexContainer>
    </ProtectedRoute>
  )
})

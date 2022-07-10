import { Page } from 'common/page'
import { ProtectedRoute } from 'features/protectedRoute'
import { memo, useEffect } from 'react'
import { toast } from 'react-toastify'
import { ServiceRow } from './serviceRow'
import { useGetServicesQuery } from './servicesEndpoint'

interface ServicesProps {
  isLoggedIn: boolean
}

export const Services = memo(({ isLoggedIn }: ServicesProps) => {
  const { data, isError, error } = useGetServicesQuery(undefined, {
    skip: !isLoggedIn,
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Не удалось получить список услуг')

      console.log(error)
    }
  }, [isError, error])

  return (
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Page title="Услуги">
        {data?.map((service) => (
          <ServiceRow key={service.id} service={service} />
        ))}
      </Page>
    </ProtectedRoute>
  )
})

import { Layout } from 'common/components/layout'
import { ProtectedRoute } from 'common/components/protectedRoute'
import { memo, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ModalAddNewService } from './modalAddNewService'
import { Options } from './options'
import { ServiceRow } from './serviceRow'
import { useGetDealsQuery } from 'redux/api/deals'

interface ServicesProps {
  isLoggedIn: boolean
}

export const Services = memo(({ isLoggedIn }: ServicesProps) => {
  const [isShow, setShow] = useState(false)

  const { data, isError, error } = useGetDealsQuery(undefined, {
    skip: !isLoggedIn,
    refetchOnMountOrArgChange: true,
  })

  const onOpenModalHandler = useCallback(() => {
    setShow(true)
  }, [])

  const onCloseModalHandler = useCallback(() => {
    setShow(false)
  }, [])

  useEffect(() => {
    if (isError) {
      toast.error('Не удалось получить список услуг')

      console.log(error)
    }
  }, [isError, error])

  return (
    <ProtectedRoute isLoggedIn={isLoggedIn}>
      <Layout
        title="Услуги"
        options={<Options onOpenHandler={onOpenModalHandler} />}
      >
        <>
          {data?.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}

          <ModalAddNewService isShow={isShow} onHide={onCloseModalHandler} />
        </>
      </Layout>
    </ProtectedRoute>
  )
})

import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Layout } from 'common/components/layout'
import { ProtectedRoute } from 'common/components/protectedRoute'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { useGetDealsQuery } from 'redux/api/deals'
import { useAppSelector } from 'redux/hooks'
import { ModalAddNewService } from './modalAddNewService'
import { Options } from './options'
import { ServiceRow } from './serviceRow'

interface ServicesProps {
  isLoggedIn: boolean
}

export const Services = memo(({ isLoggedIn }: ServicesProps) => {
  const [isShowAddNewServiceModal, setShowAddNewServiceModal] = useState(false)
  const [dealsPart, setDealsPart] = useState<'all' | 'my'>('all')

  const { isError, error } = useGetDealsQuery(undefined, {
    skip: !isLoggedIn,
    refetchOnMountOrArgChange: true,
  })

  const allDeals = useAppSelector((state) => state.deals.allDeals)
  const myDeals = useAppSelector((state) => state.deals.myDeals)

  const data = useMemo(
    () => (dealsPart === 'all' ? allDeals : myDeals),
    [dealsPart, allDeals, myDeals]
  )

  const onOpenAddNewServiceModal = useCallback(() => {
    setShowAddNewServiceModal(true)
  }, [])

  const onCloseAddNewServiceModal = useCallback(() => {
    setShowAddNewServiceModal(false)
  }, [])

  const onChangeDealsPartHandler = useCallback((part: 'all' | 'my') => {
    setDealsPart(part)
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
        options={
          <Options
            dealsPart={dealsPart}
            onChangeDealsPartHandler={onChangeDealsPartHandler}
            onOpenHandler={onOpenAddNewServiceModal}
          />
        }
      >
        <StyledFlexContainer column gap="1rem" padding="0 0 3rem 0">
          {data?.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}

          <ModalAddNewService
            isShow={isShowAddNewServiceModal}
            onHide={onCloseAddNewServiceModal}
          />
        </StyledFlexContainer>
      </Layout>
    </ProtectedRoute>
  )
})

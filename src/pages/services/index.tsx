import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { useGetUserInfoQuery } from 'redux/api/user'
import { useGetDealsQuery } from 'redux/api/deals'
import { useAppSelector } from 'redux/hooks'
import { Layout } from 'common/components/layout'
import { ProtectedRoute } from 'common/components/protectedRoute'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { ModalAddNewService } from './modalAddNewService'
import { ServicesOptions } from './servicesOptions'
import { ServiceRow } from './serviceRow'

export const Services = () => {
  const [isShowAddNewServiceModal, setShowAddNewServiceModal] = useState(false)
  const [dealsPart, setDealsPart] = useState<'all' | 'my'>('all')

  const isLoggedIn = useAppSelector((state) => state.account.isLoggedIn)
  const allDeals = useAppSelector((state) => state.deals.allDeals)
  const myDeals = useAppSelector((state) => state.deals.myDeals)

  const { isError: isGetDealsError, error: getDealsError } = useGetDealsQuery(
    undefined,
    {
      skip: !isLoggedIn,
      refetchOnMountOrArgChange: true,
    }
  )

  const userId = useAppSelector((state) => state.account.userId)

  const { isError: isGetUserError, error: getUserError } = useGetUserInfoQuery(
    userId,
    {
      skip: !userId,
      refetchOnMountOrArgChange: true,
    }
  )

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
    if (isGetDealsError) {
      toast.error('Не удалось получить список услуг')

      console.log(getDealsError)
    }
  }, [isGetDealsError, getDealsError])

  useEffect(() => {
    if (isGetUserError) {
      toast.error('Не удалось получить данные пользователя')

      console.log(getUserError)
    }
  }, [isGetUserError, getUserError])

  return (
    <ProtectedRoute>
      <Layout
        title="Услуги"
        options={
          <ServicesOptions
            dealsPart={dealsPart}
            onChangeDealsPartHandler={onChangeDealsPartHandler}
            onOpenHandler={onOpenAddNewServiceModal}
          />
        }
      >
        <StyledFlexContainer width="80%" column gap="1rem" padding="0 0 3rem 0">
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
}

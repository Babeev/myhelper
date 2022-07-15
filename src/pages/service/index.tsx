import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  useGetDealQuery,
  useSubscribeDealMutation,
  useUnsubscribeDealMutation,
} from 'redux/api/deals'
import { useAppSelector } from 'redux/hooks'
import { Deal } from 'types'
import { Layout } from 'common/components/layout'
import { ProtectedRoute } from 'common/components/protectedRoute'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledP } from 'common/styled/styledP'
import { COLORS } from 'utils/constants'
import { ServiceOptions } from './serviceOptions'
import { ModalEditService } from './modalEditService'
import { ModalDeleteService } from './modalDeleteService'

export const Service = () => {
  const navigate = useNavigate()

  const [isEditServiceModalOpen, setEditServiceModalOpen] = useState(false)
  const [isDeleteServiceModalOpen, setDeleteServiceModalOpen] = useState(false)

  const params = useParams()

  const { data, isError, error } = useGetDealQuery(params.serviceId || null, {
    refetchOnMountOrArgChange: true,
  })
  const [subscribeDeal] = useSubscribeDealMutation()
  const [unsubscribeDeal] = useUnsubscribeDealMutation()

  const userId = useAppSelector((state) => state.account.userId)

  const isUserSubscriber = useMemo(
    () => data?.subscribers?.some((id) => id === userId),
    [data, userId]
  )

  const isUserOwner = useMemo(() => data?.ownerId === userId, [data, userId])

  const isCanSubscribe = data && !isUserOwner && !isUserSubscriber

  const isCanUnsubcribe = data && !isUserOwner && isUserSubscriber

  const onSubscribeDeal = () => {
    const promise = subscribeDeal({
      dealId: Number(params.serviceId) || null,
      subscriberId: userId,
    }).unwrap()

    toast.promise(promise, {
      pending: 'Загрузка...',
      success: 'Вы купили услугу',
      error: 'Произошла ошибка',
    })

    promise.catch((e) => console.log(e))
  }

  const onUnsubscribeDeal = async () => {
    const waiting = toast.loading('Отмена покупки...')
    try {
      await unsubscribeDeal({
        dealId: data?.id || null,
        subscriberId: userId,
      }).unwrap()

      toast.update(waiting, {
        render: 'Покупка отменена',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    } catch (e) {
      toast.update(waiting, {
        render: 'Не удалось отменить покупку',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })

      console.log(e)
    }
  }

  const onReturnHandler = useCallback(() => {
    navigate('/services')
  }, [navigate])

  useEffect(() => {
    if (isError) {
      toast.error('Не удалось получить подробности по услуге')
    }
  }, [isError, error])

  return (
    <ProtectedRoute>
      <Layout
        title={data?.name || 'Нет данных'}
        isReturnPath={true}
        onReturnHandler={onReturnHandler}
        options={
          <ServiceOptions
            deal={data as Deal}
            onOpenModalEdit={() => setEditServiceModalOpen(true)}
            onOpenModalDelete={() => setDeleteServiceModalOpen(true)}
          />
        }
      >
        <StyledFlexContainer width="80%" column gap="1rem" padding="0 0 3rem 0">
          <StyledP fontWeight={500}>
            Город: {data?.city || 'Нет данных'}
          </StyledP>

          <StyledP>{data?.description || 'Нет данных'}</StyledP>

          {isCanSubscribe && (
            <StyledFlexContainer>
              <StyledButton
                color={COLORS.PRIMARY}
                padding="0.5rem 1rem"
                onClick={onSubscribeDeal}
              >
                Купить
              </StyledButton>
            </StyledFlexContainer>
          )}

          {isCanUnsubcribe && (
            <StyledFlexContainer>
              <StyledButton
                color={COLORS.PRIMARY}
                padding="0.5rem 1rem"
                onClick={onUnsubscribeDeal}
              >
                Отменить покупку
              </StyledButton>
            </StyledFlexContainer>
          )}

          <ModalEditService
            initialValues={data as Deal}
            isShow={isEditServiceModalOpen}
            onHide={() => setEditServiceModalOpen(false)}
          />

          <ModalDeleteService
            isShow={isDeleteServiceModalOpen}
            onHide={() => setDeleteServiceModalOpen(false)}
            dealId={data?.id || null}
          />
        </StyledFlexContainer>
      </Layout>
    </ProtectedRoute>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useGetDealQuery, useSubscribeDealMutation } from 'redux/api/deals'
import { useAppSelector } from 'redux/hooks'
import { Layout } from 'common/components/layout'
import { ProtectedRoute } from 'common/components/protectedRoute'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledP } from 'common/styled/styledP'
import { COLORS } from 'utils/constants'
import { ServiceOptions } from './serviceOptions'
import { ModalEditService } from './modalEditService'
import { Deal } from 'types'

export const Service = () => {
  const navigate = useNavigate()

  const [isEditServiceModalOpen, setEditServiceModalOpen] = useState(false)

  const params = useParams()

  const { data, isError, error } = useGetDealQuery(params.serviceId || null, {
    refetchOnMountOrArgChange: true,
  })
  const [subscribeDeal] = useSubscribeDealMutation()

  const userId = useAppSelector((state) => state.account.userId)

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
            onOpenHandler={() => setEditServiceModalOpen(true)}
          />
        }
      >
        <StyledFlexContainer width="80%" column gap="1rem" padding="0 0 3rem 0">
          <StyledP>{data?.description || 'Нет данных'}</StyledP>

          {userId !== data?.ownerId && (
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

          <ModalEditService
            initialValues={data as Deal}
            isShow={isEditServiceModalOpen}
            onHide={() => setEditServiceModalOpen(false)}
          />
        </StyledFlexContainer>
      </Layout>
    </ProtectedRoute>
  )
}

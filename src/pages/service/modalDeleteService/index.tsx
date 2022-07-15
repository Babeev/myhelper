import { memo } from 'react'
import { Modal } from 'common/components/modal'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledP } from 'common/styled/styledP'
import { COLORS } from 'utils/constants'
import { useDeleteDealMutation } from 'redux/api/deals'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

interface ModalDeleteServiceProps {
  isShow: boolean
  onHide: () => void
  dealId: number | null
}

export const ModalDeleteService = memo(
  ({ isShow, onHide, dealId }: ModalDeleteServiceProps) => {
    const navigate = useNavigate()

    const [deleteService] = useDeleteDealMutation()

    const onDeleteHandler = async () => {
      const waiting = toast.loading('Удаление...')

      try {
        await deleteService(dealId).unwrap()

        toast.update(waiting, {
          render: 'Услуга удалена',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })

        navigate('/services')
      } catch (e) {
        toast.update(waiting, {
          render: 'Не получилось удалить услугу',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })
        console.log(e)
      }
    }

    return (
      <Modal isShow={isShow} onHide={onHide} title="Удаление услуги">
        <StyledFlexContainer column padding="1rem 0 0 0" gap="1rem">
          <StyledFlexContainer column gap="0.5rem">
            <StyledP fontWeight={500}>
              Вы действительно хотите удалить услугу?
            </StyledP>

            <StyledP fontWeight={500}>
              Отменить это действие будет невозможно.
            </StyledP>
          </StyledFlexContainer>

          <StyledFlexContainer
            padding="0.5rem 0 0 0"
            justifyContent="space-between"
          >
            <StyledButton
              padding="0.5rem 1rem"
              color={COLORS.WARNING}
              onClick={onHide}
            >
              Отменить
            </StyledButton>

            <StyledButton
              padding="0.5rem 1rem"
              color={COLORS.DANGER}
              onClick={onDeleteHandler}
            >
              Удалить
            </StyledButton>
          </StyledFlexContainer>
        </StyledFlexContainer>
      </Modal>
    )
  }
)

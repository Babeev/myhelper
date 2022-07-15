import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clearAccount } from 'redux/slices'
import { useAppSelector } from 'redux/hooks'
import { useDeleteUserMutation } from 'redux/api/user'
import { Modal } from 'common/components/modal'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledP } from 'common/styled/styledP'
import { StyledButton } from 'common/styled/styledButton'
import { COLORS } from 'utils/constants'

interface ModalDeleteAccountProps {
  isShow: boolean
  onHide: () => void
}

export const ModalDeleteAccount = memo(
  ({ isShow, onHide }: ModalDeleteAccountProps) => {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userId = useAppSelector((state) => state.account.userId)

    const [deleteAccount] = useDeleteUserMutation()

    const onDeleteHandler = async () => {
      const waiting = toast.loading('Удаление...')

      try {
        await deleteAccount(userId).unwrap()

        toast.update(waiting, {
          render: 'Аккаунт удален',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        })

        await navigate('/auth/login')

        dispatch(clearAccount())
      } catch (e) {
        toast.update(waiting, {
          render: 'Не получилось удалить аккаунт',
          type: 'error',
          isLoading: false,
          autoClose: 3000,
        })

        console.log(e)
      }
    }

    return (
      <Modal isShow={isShow} onHide={onHide} title="Удаление аккаунта">
        <StyledFlexContainer column padding="1rem 0 0 0" gap="1rem">
          <StyledFlexContainer column gap="0.5rem">
            <StyledP fontWeight={500}>
              Вы действительно хотите удалить аккаунт?
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

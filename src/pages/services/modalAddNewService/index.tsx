import { memo, useMemo } from 'react'
import { toast } from 'react-toastify'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Modal } from 'common/components/modal'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { useAppSelector } from 'redux/hooks'
import { useAddDealMutation } from 'redux/api/deals'
import { COLORS } from 'utils/constants'
import { validate } from 'utils/validators/serviceDataValidate'

interface ModalAddNewServiceProps {
  isShow: boolean
  onHide: () => void
}

export const ModalAddNewService = memo(
  ({ isShow, onHide }: ModalAddNewServiceProps) => {
    const [addDeal] = useAddDealMutation()

    const userId = useAppSelector((state) => state.account.userId)

    const initialValues = useMemo(
      () => ({ name: null, description: null, city: null, price: null }),
      []
    )

    const onAddDealHandler = async (values: typeof initialValues) => {
      const date = new Date().toISOString()

      const promise = addDeal({
        ...values,
        ownerId: userId,
        date: date,
      }).unwrap()

      toast.promise(promise, {
        pending: 'Загрузка...',
        success: 'Услуга добавлена',
        error: 'Не удалось добавить услугу',
      })

      promise
        .then(() => {
          onHide()
        })
        .catch((e) => console.log(e))
    }

    return (
      <Modal isShow={isShow} onHide={onHide} title="Новая услуга">
        <Form
          initialValues={initialValues}
          validate={validate}
          onSubmit={onAddDealHandler}
        >
          {({ values, errors, isFormValid }) => (
            <StyledFlexContainer column gap="0.5rem" padding="0 3rem">
              <Input
                required
                name="name"
                label="Название"
                value={values.name}
                error={errors.name}
                cypressName="name"
              />

              <Input
                required
                name="description"
                label="Описание"
                value={values.description}
                error={errors.description}
                cypressName="description"
              />

              <Input
                required
                name="city"
                label="Город"
                value={values.city}
                error={errors.city}
                cypressName="city"
              />

              <Input
                required
                name="price"
                label="Цена"
                value={values.price}
                error={errors.price}
                cypressName="price"
              />

              <StyledFlexContainer
                column
                alignItems="center"
                padding="0.5rem 0 0 0"
              >
                <StyledButton
                  type="submit"
                  color={isFormValid ? COLORS.PRIMARY : COLORS.GRAY}
                  disabled={!isFormValid}
                  padding="0.5rem 1rem"
                >
                  Создать услугу
                </StyledButton>
              </StyledFlexContainer>
            </StyledFlexContainer>
          )}
        </Form>
      </Modal>
    )
  }
)

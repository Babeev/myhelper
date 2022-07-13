import { memo, useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Modal } from 'common/components/modal'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { AddDealRequest } from 'types'
import { useAppSelector } from 'redux/hooks'
import { useAddDealMutation } from 'redux/api/deals'
import { onlyNumbers, requiredField } from 'utils/validators'
import { COLORS } from 'utils/constants'

interface ModalAddNewServiceProps {
  isShow: boolean
  onHide: () => void
}

type initialValues = Pick<
  AddDealRequest,
  'name' | 'description' | 'city' | 'price'
>

export const ModalAddNewService = memo(
  ({ isShow, onHide }: ModalAddNewServiceProps) => {
    const [addDeal] = useAddDealMutation()

    const userId = useAppSelector((state) => state.account.userId)

    const onAddDealHandler = async (values: initialValues) => {
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

    const validate = useCallback((inputName: string, inputValue: string) => {
      const errors: Record<string, string | null> = {}

      if (inputName === 'name') {
        const error = requiredField(inputValue)

        errors.name = error
      }

      if (inputName === 'price') {
        const error = onlyNumbers(inputValue)

        errors.price = error
      }
      return errors
    }, [])

    const initialValues: initialValues = useMemo(
      () => ({ name: null, description: null, city: null, price: null }),
      []
    )

    return (
      <Modal isShow={isShow} onHide={onHide} title="Новая услуга">
        <Form initialValues={initialValues} validate={validate}>
          {({ values, errors, isFormValid }) => (
            <StyledFlexContainer column gap="0.5rem" padding="0 3rem">
              <Input
                name="name"
                label="Название"
                value={values.name}
                error={errors.name}
                cypressName="name"
              />

              <Input
                name="description"
                label="Описание"
                value={values.description}
                error={errors.description}
                cypressName="description"
              />

              <Input
                name="city"
                label="Город"
                value={values.city}
                error={errors.city}
                cypressName="city"
              />

              <Input
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
                  type="button"
                  color={isFormValid ? COLORS.PRIMARY : COLORS.GRAY}
                  disabled={!isFormValid}
                  padding="0.5rem 1rem"
                  onClick={() => onAddDealHandler(values)}
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

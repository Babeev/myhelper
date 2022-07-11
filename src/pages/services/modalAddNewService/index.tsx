import { GRAY_COLOR, PRIMARY_COLOR } from 'common/constants'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Modal } from 'common/components/modal'
import { Button } from 'common/styled/button'
import { FlexContainer } from 'common/styled/flexContainer'
import { useCallback, useMemo } from 'react'
import { requiredField } from 'common/utils/validators'
import { useAddDealMutation } from 'redux/api/deals'
import { AddDealRequest } from 'common/types'
import { toast } from 'react-toastify'
import { useAppSelector } from 'redux/hooks'

interface ModalAddNewServiceProps {
  isShow: boolean
  onHide: () => void
}

type initialValues = Pick<
  AddDealRequest,
  'name' | 'description' | 'city' | 'price'
>

export const ModalAddNewService = ({
  isShow,
  onHide,
}: ModalAddNewServiceProps) => {
  const [addDeal] = useAddDealMutation()

  const userId = useAppSelector((state) => state.account.userId)

  const onAddDealHandler = async (values: initialValues) => {
    const promise = addDeal({
      ...values,
      ownerId: userId,
      date: '',
    }).unwrap()

    toast.promise(promise, {
      pending: 'Загрузка...',
      success: 'Услуга добавлена',
      error: 'Не удалось добавить услугу',
    })

    promise.catch((e) => console.log(e))
  }

  const validate = useCallback((inputName: string, inputValue: string) => {
    const errors: Record<string, string | null> = {}

    if (inputName === 'name') {
      const error = requiredField(inputValue)
      errors.name = error
    }
    return errors
  }, [])

  const initialValues: initialValues = useMemo(
    () => ({ name: null, description: null, city: null, price: null }),
    []
  )

  return (
    <Modal isShow={isShow} onHide={onHide} title="Новая услуга">
      <FlexContainer column>
        <Form initialValues={initialValues} validate={validate}>
          {({ values, errors, isFormValid }) => (
            <FlexContainer column gap="0.5rem" padding="0 3rem">
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

              <FlexContainer column alignItems="center" padding="0.5rem 0 0 0">
                <Button
                  color={isFormValid ? PRIMARY_COLOR : GRAY_COLOR}
                  disabled={!isFormValid}
                  padding="0.5rem 1rem"
                  onClick={() => onAddDealHandler(values as initialValues)}
                >
                  Создать услугу
                </Button>
              </FlexContainer>
            </FlexContainer>
          )}
        </Form>
      </FlexContainer>
    </Modal>
  )
}

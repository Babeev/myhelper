import { memo, useCallback } from 'react'
import { Deal } from 'types'
import { Form } from 'common/components/form'
import { Input } from 'common/components/input'
import { Modal } from 'common/components/modal'
import { StyledButton } from 'common/styled/styledButton'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { COLORS } from 'utils/constants'
import { validate } from 'utils/validators/serviceDataValidate'
import { useEditDealMutation } from 'redux/api/deals'
import { toast } from 'react-toastify'

interface ModalEditServiceProps {
  initialValues: Deal
  isShow: boolean
  onHide: () => void
}

export const ModalEditService = memo(
  ({ initialValues, isShow, onHide }: ModalEditServiceProps) => {
    const [editDeal] = useEditDealMutation()

    const onSubmitHandler = useCallback(
      (values: Deal) => {
        const promise = editDeal(values).unwrap()

        toast.promise(promise, {
          pending: 'Сохранение...',
          success: 'Сохранено',
          error: 'Произошла ошибка',
        })

        promise.then(() => onHide()).catch((e) => console.log(e))
      },
      [editDeal, onHide]
    )

    return (
      <Modal isShow={isShow} onHide={onHide} title="Редактировать услугу">
        <Form
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmitHandler}
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
                  Сохранить
                </StyledButton>
              </StyledFlexContainer>
            </StyledFlexContainer>
          )}
        </Form>
      </Modal>
    )
  }
)

import { Form } from 'common/styled/form'
import { memo, ReactElement, SyntheticEvent } from 'react'

interface CustomFormProps {
  validate: (name: string, value: string) => void
  width?: string
  children: ReactElement | ReactElement[]
}

export const CustomForm = memo(
  ({ validate, children, width }: CustomFormProps) => {
    const onChangeHandler = (event: SyntheticEvent<HTMLFormElement>) => {
      const input = event.target as HTMLInputElement

      validate(input.name, input.value)
    }

    return (
      <Form onChange={onChangeHandler} width={width}>
        {children}
      </Form>
    )
  }
)

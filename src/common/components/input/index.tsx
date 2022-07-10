import { ChangeEvent, useState, FocusEvent, FormEvent } from 'react'
import { StyledInput, InputContainer, InputLabel } from './styled'

interface InputProps {
  error: string | null
  label: string
  name: string
  value: string | number | null | undefined
  margin?: string
  width?: string
  height?: string
  cypressName?: string
  onChange?: (value: string) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (value: string) => void
}

export const Input = ({
  error,
  label,
  value,
  name,
  margin,
  width,
  height,
  cypressName,
  onChange,
  onFocus,
  onBlur,
}: InputProps) => {
  const [focused, setFocused] = useState(false)

  const isFocused = focused || value != null

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    onChange?.(value)
  }

  const onFocusHandler = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    onFocus?.(event)
  }

  const onBlurHandler = (event: FormEvent<HTMLInputElement>) => {
    setFocused(false)

    if (!error) {
      onBlur?.(event.currentTarget.value)
    }
  }

  return (
    <InputContainer margin={margin} width={width} height={height}>
      <InputLabel title={error || label} error={error} focused={isFocused}>
        {error || label}
      </InputLabel>

      <StyledInput
        value={value == null ? '' : value}
        error={error}
        name={name}
        autoFocus={isFocused}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        data-cy={cypressName}
      />
    </InputContainer>
  )
}

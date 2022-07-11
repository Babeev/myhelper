import { FocusEvent, FormEvent, memo } from 'react'
import { StyledInput, InputContainer, InputLabel } from './styled'

interface InputProps {
  error: string | null
  label: string
  name: string
  value: string | number | null | undefined
  cypressName?: string
  onChange?: (value: string) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (value: string) => void
}

export const Input = memo(
  ({
    error,
    label,
    value,
    name,
    cypressName,
    onChange,
    onFocus,
    onBlur,
  }: InputProps) => {
    const onBlurHandler = (event: FormEvent<HTMLInputElement>) => {
      if (!error) {
        onBlur?.(event.currentTarget.value)
      }
    }

    return (
      <InputContainer>
        <InputLabel
          title={error || label}
          error={error}
          isValueExist={value != null}
        >
          {error || label}
        </InputLabel>

        <StyledInput
          value={value == null ? '' : value}
          error={error}
          name={name}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={(e) => onFocus?.(e)}
          onBlur={onBlurHandler}
          data-cy={cypressName}
        />
      </InputContainer>
    )
  }
)

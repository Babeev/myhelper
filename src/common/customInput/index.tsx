import { ChangeEvent, useState, FocusEvent, FormEvent } from 'react'
import { GRAY_COLOR, DANGER_COLOR } from 'common/constants'
import styled from 'styled-components'

interface CustomInputProps {
  error: string | null
  label: string
  name: string
  value: string | number | null | undefined
  margin?: string
  width?: string
  height?: string
  onChange?: (value: string) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void
  onBlur?: (value: string) => void
}

const InputContainer = styled.div<{
  margin?: string
  width?: string
  height?: string
}>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: ${({ margin }) => margin || 0};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || 'auto'};
`

const InputLabel = styled.label<{
  paddingLeft?: string
  focused: boolean
  error?: string | null
}>`
  position: absolute;
  top: 25%;
  left: ${({ paddingLeft }) => paddingLeft || '0.85rem'};
  transition: all 0.2s ease;
  z-index: 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 90%;

  color: ${({ error }) => (error ? DANGER_COLOR : GRAY_COLOR)};

  ${({ focused }) =>
    focused &&
    `
      font-size: 13px;
      transform: translateY(-100%) translateX(-5px);
      z-index: 1;
      background: white;
      padding: 0 8px;
    `}
`

const Input = styled.input<{
  error: string | null
  paddingTop?: string
  paddingRight?: string
  paddingBottom?: string
  paddingLeft?: string
}>`
  border: 2px solid ${({ error }) => (error ? DANGER_COLOR : GRAY_COLOR)};
  border-radius: 0.45rem;
  background-color: transparent;
  outline: none;
  padding-top: ${({ paddingTop }) => (paddingTop ? paddingTop : '0.75rem')};
  padding-right: ${({ paddingRight }) =>
    paddingRight ? paddingRight : '0.25rem'};
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : '0.75rem'};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0.9rem')};
  font-size: 1rem;
  transition: all 0.2s ease;
  z-index: 0;
`

export const CustomInput = ({
  error,
  label,
  value,
  name,
  margin,
  width,
  height,
  onChange,
  onFocus,
  onBlur,
}: CustomInputProps) => {
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

      <Input
        value={value == null ? '' : value}
        error={error}
        name={name}
        autoFocus={isFocused}
        onChange={onChangeHandler}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      />
    </InputContainer>
  )
}

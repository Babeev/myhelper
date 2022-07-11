import { memo, ReactElement } from 'react'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledHeader } from 'common/styled/styledHeader'
import { BACKGROUND_COLOR } from 'utils/constants'
import { Overlay } from './styled'

interface ModalProps {
  isShow: boolean
  onHide: () => void
  title?: string
  children?: ReactElement | null
}

export const Modal = memo(({ isShow, onHide, title, children }: ModalProps) => {
  const onHideHandler = () => {
    onHide()
  }

  return isShow ? (
    <>
      <Overlay onClick={onHideHandler} />

      <StyledFlexContainer
        column
        position="fixed"
        top="25%"
        right="25%"
        height="auto"
        backgroundColor={BACKGROUND_COLOR}
        borderRadius="30px"
        overflow="auto"
        padding="1rem"
        onScroll={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        gap="1rem"
      >
        <StyledHeader fontSize="1.5rem">{title}</StyledHeader>

        <StyledFlexContainer>{children}</StyledFlexContainer>
      </StyledFlexContainer>
    </>
  ) : null
})

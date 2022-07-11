import { BACKGROUND_COLOR } from 'common/constants'
import { FlexContainer } from 'common/styled/flexContainer'
import { Header } from 'common/styled/header'
import { memo, ReactElement } from 'react'
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

      <FlexContainer
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
      >
        <Header fontSize="1.5rem" margin="0 auto 1rem 0">
          {title}
        </Header>

        <FlexContainer>{children}</FlexContainer>
      </FlexContainer>
    </>
  ) : null
})

import { FlexContainer } from 'common/styled/flexContainer'
import { Header } from 'common/styled/header'
import { ReturnButton } from 'common/components/returnButton'
import { ReactElement } from 'react'

interface PageProps {
  isReturnPath?: boolean
  onReturnHandler?: () => void
  title?: string
  contentWidth?: string
  options?: ReactElement
  children?: ReactElement | null | undefined
}

export const Layout = ({
  isReturnPath,
  onReturnHandler,
  title,
  contentWidth,
  options,
  children,
}: PageProps) => {
  return (
    <FlexContainer width="100%" height="100%" position="relative">
      {isReturnPath && onReturnHandler && (
        <ReturnButton onClickHandler={onReturnHandler} />
      )}

      <FlexContainer width="100%" column margin="0" padding="3rem">
        <FlexContainer margin="0 0 2rem 0">
          <Header margin="0 auto 0 0">{title}</Header>

          {options}
        </FlexContainer>

        <FlexContainer column margin="auto" width={contentWidth}>
          {children}
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}

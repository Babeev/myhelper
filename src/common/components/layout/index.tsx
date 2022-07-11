import { FlexContainer } from 'common/styled/flexContainer'
import { Header } from 'common/styled/header'
import { ReturnButton } from 'common/components/returnButton'
import { ReactElement } from 'react'

interface PageProps {
  isReturnPath?: boolean
  onReturnHandler?: () => void
  title?: string
  options?: ReactElement
  children?: ReactElement | null | undefined
}

export const Layout = ({
  isReturnPath,
  onReturnHandler,
  title,
  options,
  children,
}: PageProps) => {
  return (
    <FlexContainer height="100%" position="relative">
      {isReturnPath && onReturnHandler && (
        <ReturnButton onClickHandler={onReturnHandler} />
      )}

      <FlexContainer column padding="3rem" width="100%">
        <FlexContainer padding="0 0 2rem 0">
          <Header margin="0 auto 0 0">{title}</Header>

          {options}
        </FlexContainer>

        <FlexContainer column alignItems="center">
          {children}
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}

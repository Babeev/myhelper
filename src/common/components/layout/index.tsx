import { memo, ReactElement } from 'react'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { StyledHeader } from 'common/styled/styledHeader'
import { ReturnButton } from 'common/components/returnButton'

interface PageProps {
  isReturnPath?: boolean
  onReturnHandler?: () => void
  title?: string
  options?: ReactElement
  children?: ReactElement | null | undefined
}

export const Layout = memo(
  ({ isReturnPath, onReturnHandler, title, options, children }: PageProps) => {
    return (
      <StyledFlexContainer height="100%" position="relative">
        {isReturnPath && onReturnHandler && (
          <ReturnButton onClickHandler={onReturnHandler} />
        )}

        <StyledFlexContainer column padding="3rem" width="100%">
          <StyledFlexContainer
            padding="0 0 2rem 0"
            justifyContent="space-between"
          >
            <StyledHeader>{title}</StyledHeader>

            {options}
          </StyledFlexContainer>

          <StyledFlexContainer column alignItems="center">
            {children}
          </StyledFlexContainer>
        </StyledFlexContainer>
      </StyledFlexContainer>
    )
  }
)

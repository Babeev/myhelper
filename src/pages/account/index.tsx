import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from 'common/components/layout'
import { ProtectedRoute } from 'common/components/protectedRoute'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'
import { AccountForm } from './accountForm'
import { AccountOptions } from './accountOptions'
import { ModalDeleteAccount } from './modalDeleteAccount'

export const Account = () => {
  const navigate = useNavigate()

  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false)

  const onClickReturnHandler = useCallback(() => {
    navigate('/services')
  }, [navigate])

  const onOpenModalDelete = useCallback(() => {
    setModalDeleteOpen(true)
  }, [])

  const onCloseModalDelete = useCallback(() => {
    setModalDeleteOpen(false)
  }, [])

  return (
    <ProtectedRoute>
      <Layout
        isReturnPath={true}
        onReturnHandler={onClickReturnHandler}
        title="Профиль"
        options={<AccountOptions onOpenModalDelete={onOpenModalDelete} />}
      >
        <StyledFlexContainer column width="50%" padding="1rem 0 0 0">
          <AccountForm />

          <ModalDeleteAccount
            isShow={isModalDeleteOpen}
            onHide={onCloseModalDelete}
          />
        </StyledFlexContainer>
      </Layout>
    </ProtectedRoute>
  )
}

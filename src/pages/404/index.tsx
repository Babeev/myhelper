import { Layout } from 'common/components/layout'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFound = () => {
  const navigate = useNavigate()

  const onClickReturnHandler = useCallback(() => {
    navigate('/services')
  }, [navigate])

  return (
    <Layout
      isReturnPath={true}
      onReturnHandler={onClickReturnHandler}
      title="Страница не найдена"
    />
  )
}

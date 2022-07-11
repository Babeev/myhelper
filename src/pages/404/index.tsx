import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from 'common/components/layout'

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

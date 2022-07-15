import { ChangeEvent, useEffect, useRef } from 'react'
import { toast } from 'react-toastify'
import {
  useGetUserAvatarQuery,
  usePostUserAvatarMutation,
} from 'redux/api/user'
import { useAppSelector } from 'redux/hooks'
import { StyledImg } from 'common/styled/styledImg'
import { StyledP } from 'common/styled/styledP'
import { StyledFlexContainer } from 'common/styled/styledFlexContainer'

interface AvatarProps {
  isEditable: boolean
  width: string
  height: string
}

export const Avatar = ({ isEditable, width, height }: AvatarProps) => {
  const avatarRef = useRef<HTMLInputElement | null>(null)

  const userAvatarSrc = useAppSelector((state) => state.account.avatarSrc)

  const { isError, error } = useGetUserAvatarQuery()
  const [postUserAvatar] = usePostUserAvatarMutation()

  const onUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    const data = new FormData()

    if (!file) {
      return
    }

    data.append('avatarFile', file)

    const waiting = toast.loading('Обновление фото профиля...')

    try {
      await postUserAvatar(data).unwrap()

      toast.update(waiting, {
        render: 'Фото обновлено',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      })
    } catch (e) {
      toast.update(waiting, {
        render: 'Не удалось обновить фото',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      })

      console.log(e)
    }
  }

  useEffect(() => {
    if (isError) {
      toast.error('Не удалось получить фото профиля')

      console.log(error)
    }
  }, [isError, error])

  return (
    <>
      {isEditable && (
        <input
          type="file"
          style={{ display: 'none' }}
          ref={avatarRef}
          onChange={onUploadAvatar}
          accept="image/png,image/jpeg,image/gif"
        />
      )}

      {userAvatarSrc ? (
        <StyledImg
          width={width}
          height={height}
          borderRadius="50%"
          cursor="pointer"
          hoverOpacity="0.7"
          src={userAvatarSrc}
          onClick={() => avatarRef.current?.click()}
        />
      ) : (
        <StyledFlexContainer
          width={width}
          height={height}
          borderRadius="50%"
          backgroundColor="gray"
          alignItems="center"
          justifyContent="center"
          hoverOpacity={0.7}
          cursor="pointer"
          onClick={() => avatarRef.current?.click()}
        >
          <StyledP
            fontSize="0.6rem"
            fontWeight={500}
            color="#fff"
            cursor="pointer"
          >
            Нет фото
          </StyledP>
        </StyledFlexContainer>
      )}
    </>
  )
}

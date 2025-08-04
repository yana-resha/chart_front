import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { HeaderBackButtonContainer, HeaderBackIcon, HeaderBackText } from './index.linaria'

interface HeaderBackButtonProps {
  text?: string
  onClick?: () => void
  className?: string
}

export const HeaderBackButton = ({ text = 'Назад', onClick }: HeaderBackButtonProps) => {
  const navigate = useNavigate()
  const [canGoBack, setCanGoBack] = useState(true)

  useEffect(() => {
    // Простая проверка: если в истории нет предыдущих страниц — нельзя назад
    setCanGoBack(window.history.length > 1)
  }, [])

  const handleClick = () => {
    if (!canGoBack) return
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <HeaderBackButtonContainer
      kind="text"
      size="large"
      onClick={handleClick}
      aria-label={text}
      className={canGoBack && !onClick ? undefined : 'disabled'}
    >
      <HeaderBackIcon />
      <HeaderBackText>{text}</HeaderBackText>
    </HeaderBackButtonContainer>
  )
}

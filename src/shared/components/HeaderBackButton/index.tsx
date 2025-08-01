import { useNavigate } from 'react-router-dom'

import { HeaderBackButtonContainer, HeaderBackIcon, HeaderBackText } from './index.linaria'
import { Button } from '../Button'

interface HeaderBackButtonProps {
  text?: string
  onClick?: () => void
  className?: string
}

/**
 * Кнопка "Назад" — кликабельна вся область (иконка + текст).
 * Если `onClick` не передан — делает `navigate(-1)`.
 */
export const HeaderBackButton = ({ text = 'Назад', onClick }: HeaderBackButtonProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
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
    >
      <HeaderBackIcon />
      <HeaderBackText>{text}</HeaderBackText>
    </HeaderBackButtonContainer>
  )
}

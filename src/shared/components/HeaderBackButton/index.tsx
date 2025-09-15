import React from 'react'

import { useNavigate } from 'react-router-dom'

import { HeaderBackButtonContainer, HeaderBackIcon, HeaderBackText } from './index.linaria'

interface HeaderBackButtonProps {
  text?: string
  to?: string
  className?: string
}

export const HeaderBackButton = ({ text = 'Назад', to }: HeaderBackButtonProps) => {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    if (!to) {
      e.preventDefault() // не переходить по пустому href
      navigate(-1)
    }
  }

  return (
    <HeaderBackButtonContainer
      to={to ?? '#'}
      onClick={handleClick}
    >
      <HeaderBackIcon />
      <HeaderBackText>{text}</HeaderBackText>
    </HeaderBackButtonContainer>
  )
}

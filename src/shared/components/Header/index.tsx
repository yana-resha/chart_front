import { HeaderContainer, HeaderText, LeftChevronStyled } from './index.linaria'

interface IHeaderProps {
  showBackButton?: boolean
  text?: string
  onClick?: () => void
}

/**
 *
 * @param showBackButton - Отображать кнопку назад
 * @param text - Текст хэдера
 * @param onClick - Обработчик события при клике на кнопку назад
 */
export const Header = ({ showBackButton = false, text = '', onClick = () => {} }: IHeaderProps) => (
  <HeaderContainer>
    {showBackButton && <LeftChevronStyled onClick={onClick} />}
    <HeaderText>{text}</HeaderText>
  </HeaderContainer>
)

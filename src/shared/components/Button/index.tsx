import { ButtonHTMLAttributes, ReactNode } from 'react'

import classNames from 'classnames'

import { ButtonComponent, ChildrenContainer, Loader } from './index.linaria'
import { TKind, TSize, TTheme } from './types'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  kind?: TKind
  theme?: TTheme
  size?: TSize
  roundedCorner?: boolean
  children?: string | ReactNode
  isLoading?: boolean
}

export const Button = ({
  kind = 'gradient',
  theme = 'primary',
  size = 'medium',
  roundedCorner = false,
  children,
  isLoading,
  className,
  ...props
}: ButtonProps) => (
  <ButtonComponent
    className={classNames([kind, theme, size, className], { isLoading })}
    roundedCorner={roundedCorner}
    content={children}
    {...props}
  >
    <>
      <ChildrenContainer>{children}</ChildrenContainer>
      {isLoading && <Loader />}
    </>
  </ButtonComponent>
)

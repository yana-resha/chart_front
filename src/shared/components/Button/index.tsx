import { ElementType } from 'react'

import classNames from 'classnames'

import { ButtonComponent, ChildrenContainer, Loader } from './index.linaria'
import { ButtonProps } from './types'
import LoaderIMG from '@/shared/assets/icons/btn-loader.svg?react'

export const Button = <C extends ElementType = 'button'>({
  as,
  kind = 'gradient',
  theme = 'primary',
  size = 'medium',
  roundedCorner = false,
  children,
  isLoading,
  className,
  ...props
}: ButtonProps<C>) => {
  const Component = as || 'button'

  return (
    <ButtonComponent
      as={Component}
      className={classNames([kind, theme, size, className], { isLoading })}
      roundedCorner={roundedCorner}
      content={children}
      {...props} // ← сюда попадут `onClick` для button, `href` для a, `to` для Link и т.д.
    >
      <>
        <ChildrenContainer>{children}</ChildrenContainer>
        {isLoading && (
          <Loader>
            <LoaderIMG />
          </Loader>
        )}
      </>
    </ButtonComponent>
  )
}

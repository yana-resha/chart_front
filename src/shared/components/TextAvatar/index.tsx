import classNames from 'classnames'

import { Container } from './index.linaria'
import { IAvatarProps } from './types'

export const TextAvatar = ({ text, size = 'large' }: IAvatarProps) => (
  <Container className={classNames([size])}>{text}</Container>
)

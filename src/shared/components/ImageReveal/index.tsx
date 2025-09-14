import React, { JSX } from 'react'

import { ZoomFrame, ZoomImg } from './index.linaria'
import { useRevealOnView } from '@/shared/hooks/useRevealOnView'

type FrameProps = JSX.IntrinsicElements['div']
type ImgProps = Omit<JSX.IntrinsicElements['img'], 'ref'>

type Props = {
  once?: boolean
  frameProps?: FrameProps // атрибуты на <div>
  imgProps: ImgProps // атрибуты на <img> (src/alt обязательны тут)
}

export const ImageReveal: React.FC<Props> = ({ once = false, frameProps, imgProps }) => {
  const { ref, inView } = useRevealOnView({ once, threshold: 0.2 })
  const cls = [imgProps.className, inView ? 'inview' : ''].filter(Boolean).join(' ')

  return (
    <ZoomFrame {...frameProps}>
      <ZoomImg
        ref={ref}
        {...imgProps}
        className={cls}
      />
    </ZoomFrame>
  )
}

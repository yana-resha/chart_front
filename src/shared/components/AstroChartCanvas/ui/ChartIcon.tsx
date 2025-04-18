import type { ImageConfig } from 'konva/lib/shapes/Image'
import { Image } from 'react-konva'
import useImage from 'use-image'

interface Props extends Omit<ImageConfig, 'image'> {
  path: string
}

export const ChartIcon = ({ path, x, y, width = 24, height = 24, ...rest }: Props) => {
  const [image] = useImage(path)

  return image ? (
    <Image
      image={image}
      x={x}
      y={y}
      width={width}
      height={height}
      {...rest}
    />
  ) : null
}

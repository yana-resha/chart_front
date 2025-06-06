import Konva from 'konva'
import { Node } from 'konva/lib/Node'
import { Ellipse } from 'konva/lib/shapes/Ellipse'
import { Line } from 'konva/lib/shapes/Line'
import { Text } from 'konva/lib/shapes/Text'

export const lineHoverAnimation = (line: Node, isHighlighted: boolean, LINE_DEFAULT_OPACITY: number) => {
  new Konva.Tween({
    node: line,
    strokeWidth: isHighlighted ? 3 : 1.5,
    opacity: isHighlighted ? 1 : LINE_DEFAULT_OPACITY,
    shadowBlur: isHighlighted ? 12 : 0,
    shadowOpacity: isHighlighted ? 0.8 : 0,
    duration: 0.1,
  }).play()
}

export const textHoverAnimation = (text: Node, isHighlighted: boolean, TEXT_DEFAULT_OPACITY: number) => {
  new Konva.Tween({
    node: text,
    scaleX: isHighlighted ? 1.1 : 1,
    scaleY: isHighlighted ? 1.1 : 1,
    opacity: isHighlighted ? 1 : TEXT_DEFAULT_OPACITY,
    shadowBlur: isHighlighted ? 12 : 0,
    shadowOpacity: isHighlighted ? 0.8 : 0,
    duration: 0.1,
  }).play()
}

interface ILineRenderProps {
  line: Line
  pos: {
    x: number
    y: number
  }

  linePart: {
    x1: number
    y1: number
    x2: number
    y2: number
  }
  delay?: number
}

export const lineRenderAnimation = ({ line, linePart, delay = 0 }: ILineRenderProps) => {
  line.points([linePart.x1, linePart.y1, linePart.x2, linePart.y2])
  line.opacity(0)
  line.shadowBlur(20)
  line.shadowOpacity(0.8)
  // первая фаза — мягкая подсветка
  const glowTween = new Konva.Tween({
    node: line,
    opacity: 1,
    shadowBlur: 30,
    duration: 0.8,
    easing: Konva.Easings.EaseInOut,
  })

  // вторая фаза — плавное растворение свечения
  const settleTween = new Konva.Tween({
    node: line,
    shadowBlur: 0,
    shadowOpacity: 0,
    duration: 1.2,
    easing: Konva.Easings.EaseInOut,
    onFinish: () => {
      line.opacity(1)
      line.shadowBlur(0)
      line.shadowOpacity(0)
    },
  })

  const startAnimation = () => {
    glowTween.play()
    setTimeout(() => {
      settleTween.play()
    }, 800) // чуть дольше чем первая фаза
  }

  if (delay > 0) {
    setTimeout(() => startAnimation(), delay)
  } else {
    startAnimation()
  }
}

export const ellipseRenderAnimation = (
  ellipse: Ellipse,
  LINE_DEFAULT_OPACITY: number,
  delay: number = 0, // в миллисекундах
) => {
  ellipse.opacity(0)

  const tween = new Konva.Tween({
    node: ellipse,
    opacity: LINE_DEFAULT_OPACITY,
    duration: 0.6,
    easing: Konva.Easings.EaseInOut,
  })

  if (delay > 0) {
    setTimeout(() => {
      tween.play()
    }, delay)
  } else {
    tween.play()
  }
}

export const textRenderAnimation = (text: Text, TEXT_DEFAULT_OPACITY: number, delay: number = 0) => {
  text.opacity(0)
  const tween = new Konva.Tween({
    node: text,
    opacity: TEXT_DEFAULT_OPACITY,
    delay: 5,
    duration: 2,
    easing: Konva.Easings.EaseInOut,
  })

  if (delay > 0) {
    setTimeout(() => {
      tween.play()
    }, delay)
  } else {
    tween.play()
  }
}

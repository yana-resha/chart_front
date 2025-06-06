import Konva from 'konva'

export const getMouseCoords = (evt: Konva.KonvaEventObject<MouseEvent>) => {
  const { clientX, clientY } = evt.evt

  return {
    clientX,
    clientY,
  }
}

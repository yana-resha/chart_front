import { Block, Container } from './index.linaria'
import CalendarEdit from '@/shared/assets/icons/calendar-edit.svg?react'
import Check from '@/shared/assets/icons/check.svg?react'
import Circle from '@/shared/assets/icons/circle.svg?react'
import Clock from '@/shared/assets/icons/clock.svg?react'
import Cog from '@/shared/assets/icons/cog.svg?react'
import Cross from '@/shared/assets/icons/cross.svg?react'

const Components = () => (
  <Container>
    <Block>
      <CalendarEdit />
      <Check />
      <Circle />
      <Clock />
      <Cog />
      <Cross />
    </Block>
  </Container>
)

export default Components

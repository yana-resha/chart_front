import { FC } from 'react'

import { ToolsBarWrapper, LeftSide, RightSide, Icon } from './index.linaria'
import FullSizeSVG from '@/shared/assets/icons/full-size.svg?react'
import { Button } from '@/shared/components/Button'

export const ToolsBar: FC = () => (
  <ToolsBarWrapper>
    <LeftSide>{/* сюда потом вставим выпадашки */}</LeftSide>

    <RightSide>
      <Button
        title="Развернуть карту на весь экран"
        kind="text"
        theme="primary"
        onClick={() => {}}
      >
        <Icon>
          <FullSizeSVG />
        </Icon>
      </Button>
    </RightSide>
  </ToolsBarWrapper>
)

import { useMemo } from 'react'

import { AspectRatioCanvasWrapper, ChartContainer, Container } from './index.linaria'
import { useAstroCalculationPanel } from '../hooks/useAstroCalculationPanel'
import { PanelTab } from '../PanelTab'
import { ToolsBar } from '../ui/ToolsBar'
import { AstroSingleCanvas } from '@/features/AstroSingleCanvas'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SYMBOL } from '@/shared/configs/astro-planets.config'
import { ASTRO_CHART_VARIABLE } from '@/shared/types/astro/astro-commom.types'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'

export const AstroCalculationPanel = () => {
  const { data, category } = useAstroCalculationPanel()

  console.log(data, 'data')
  const planets = useMemo(
    () =>
      data?.planets.map(({ name, longitude, isRetrograde }) => ({
        name,
        label: ASTRO_PLANET_NAME[name as ASTRO_PLANET],
        longitude,
        symbol: ASTRO_PLANET_SYMBOL[name as ASTRO_PLANET] ?? ASTRO_PLANET_SYMBOL.Sun,
        isRetrograde,
      })),
    [data],
  )

  return (
    <Container>
      <ToolsBar />
      <ChartContainer>
        <AspectRatioCanvasWrapper>
          <AstroSingleCanvas
            houseCusps={category === ASTRO_CHART_VARIABLE.NATAL_CHART ? data.houses.houses : []}
            planets={planets ?? []}
            aspects={data?.aspects ?? []}
          />
        </AspectRatioCanvasWrapper>
      </ChartContainer>
      <PanelTab />
    </Container>
  )
}

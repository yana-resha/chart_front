import { useMemo } from 'react'

import { AspectRatioCanvasWrapper, ChartContainer, Container } from './index.linaria'
import { ToolsBar } from './ToolsBar'
import { IProps } from './types/index.types'
import { AstroSingleCanvas } from '@/features/AstroSingleCanvas'
import { ASTRO_PLANET_NAME, ASTRO_PLANET_SYMBOL } from '@/shared/configs/astro-planets.config'
import { ASTRO_PLANET } from '@/shared/types/astro/astro-planets.types'
import { useAppSelector } from '@/store'

export const NatalCanvasPanel = ({ chartId }: IProps) => {
  const data = useAppSelector((store) => store.natalDecoding.chartsById[chartId]?.calculation)

  const planetsMapped = useMemo(() => {
    if (!data?.planets) return []

    return data.planets.map(({ name, longitude, isRetrograde }) => ({
      name,
      label: ASTRO_PLANET_NAME[name as ASTRO_PLANET],
      longitude,
      symbol: ASTRO_PLANET_SYMBOL[name as ASTRO_PLANET] ?? ASTRO_PLANET_SYMBOL['Sun'],
      isRetrograde,
    }))
  }, [data?.planets])

  if (!data) return null
  const { aspects, houses } = data

  return (
    <Container>
      <ToolsBar />
      <ChartContainer>
        <AspectRatioCanvasWrapper>
          <AstroSingleCanvas
            houseCusps={houses.houses}
            planets={planetsMapped}
            aspects={aspects}
          />
        </AspectRatioCanvasWrapper>
      </ChartContainer>
    </Container>
  )
}

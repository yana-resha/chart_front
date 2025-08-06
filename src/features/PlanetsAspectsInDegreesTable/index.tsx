import { useMemo } from 'react'
import React from 'react'

import { orb } from './data/tooltip.data'
import { IAspect, Props } from './types'
import { Row } from './ui/Row'
import { InfoTooltip } from '@/shared/components/InfoTooltip'
import { SimpleDataTable } from '@/shared/components/SimpleDataTable'
import { sortAspectsByPlanetAndAspectPriority } from '@/shared/helpers/astro/sortAspects'

export const PlanetsAspectsInDegreesTable = ({ planetsAspects }: Props) => {
  const duplicatedAspects = useMemo(() => {
    const arr: IAspect[] = []

    planetsAspects.forEach((aspect) => {
      arr.push(aspect)
      arr.push({
        ...aspect,
        planetA: aspect.planetB,
        planetB: aspect.planetA,
      })
    })

    return arr
  }, [planetsAspects])
  const sortedAspects = useMemo(
    () => sortAspectsByPlanetAndAspectPriority(duplicatedAspects),
    [duplicatedAspects],
  )

  return (
    <SimpleDataTable>
      <SimpleDataTable.HeadRow>
        <SimpleDataTable.Header style={{ position: 'sticky', top: 0 }}>Планета</SimpleDataTable.Header>
        <SimpleDataTable.Header style={{ position: 'sticky', top: 0 }}>Аспект</SimpleDataTable.Header>
        <SimpleDataTable.Header style={{ position: 'sticky', top: 0 }}>Планета</SimpleDataTable.Header>
        <SimpleDataTable.Header style={{ position: 'sticky', top: 0 }}>
          Орбис <InfoTooltip content={<div style={{ whiteSpace: 'pre-line' }}>{orb}</div>} />
        </SimpleDataTable.Header>
      </SimpleDataTable.HeadRow>
      <SimpleDataTable.TBody>
        {sortedAspects.map((aspect, index) => {
          const isLastInGroup =
            sortedAspects[index + 1] && sortedAspects[index + 1].planetA !== aspect.planetA

          return (
            <React.Fragment key={aspect.aspectType + aspect.planetA + aspect.planetB + aspect.orb}>
              <Row {...aspect} />
              {isLastInGroup && <SimpleDataTable.SeparatorRow colSpan={4} />}
            </React.Fragment>
          )
        })}
      </SimpleDataTable.TBody>
    </SimpleDataTable>
  )
}

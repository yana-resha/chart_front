import { useState } from 'react'

import classNames from 'classnames'

import { getAspectBetween } from './helpers/getAspectBetween'
import { TableWrapper, Table, CellContent, cellStyle } from './index.linaria'
import { Aspect, Props } from './types'
import { AspectCell } from './ui/AspectCell'
import { PlanetDiagonalCell } from './ui/PlanetDiagonalCell'

export const AspectTable = ({ planets, aspects }: Props) => {
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)
  const [hoveredAspect, setHoveredAspect] = useState<Aspect | null>(null)

  return (
    <TableWrapper>
      <Table>
        <tbody>
          {planets.map((planetRow, rowIdx) => (
            <tr key={planetRow.name}>
              {planets.map((planetCol, colIdx) => {
                if (colIdx > rowIdx) return null
                if (colIdx === rowIdx) {
                  const isHovered =
                    hoveredAspect?.planetA === planetRow.name || hoveredAspect?.planetB === planetRow.name

                  return (
                    <PlanetDiagonalCell
                      onHoverStart={() => setHoveredPlanet(planetRow.name)}
                      onHoverEnd={() => setHoveredPlanet(null)}
                      key={colIdx}
                      planet={planetRow}
                      className={classNames({
                        planetActive: hoveredPlanet === planetRow.name,
                        aspectActive: isHovered,
                      })}
                    />
                  )
                }

                const aspect = getAspectBetween(planetRow.name, planetCol.name, aspects)
                if (!aspect) {
                  return (
                    <td
                      key={colIdx}
                      className={classNames(cellStyle, {
                        planetActive: hoveredPlanet === planetCol.name,
                      })}
                    >
                      <CellContent />
                    </td>
                  )
                }

                return (
                  <AspectCell
                    className={hoveredPlanet === planetCol.name ? 'planetActive' : ''}
                    onHoverStart={() => setHoveredAspect(aspect)}
                    onHoverEnd={() => setHoveredAspect(null)}
                    key={colIdx}
                    aspect={aspect}
                    planets={planets}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  )
}

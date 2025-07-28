import { FC } from 'react'

import { Card, Label, Row, Icon, Divider } from './index.linaria'
import { useAppSelector } from '@/store'

interface ChartSourceDataProps {
  chartId: string
}

export const NatalChartSourceData: FC<ChartSourceDataProps> = ({ chartId }) => {
  const sourceData = useAppSelector((store) => store.natalDecoding.chartsById[chartId].sourceValue)

  if (!sourceData) return null

  const { datetime, timezone, latitude, longitude, place, jd } = sourceData

  const utcDate = new Date(datetime)
  const timezoneOffsetMs = timezone * 60 * 60 * 1000
  const localDate = new Date(utcDate.getTime() + timezoneOffsetMs)

  const toStr = (d: Date) => {
    const dd = String(d.getUTCDate()).padStart(2, '0')
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
    const yyyy = d.getUTCFullYear()
    const hh = String(d.getUTCHours()).padStart(2, '0')
    const min = String(d.getUTCMinutes()).padStart(2, '0')

    return `${dd}.${mm}.${yyyy} ${hh}:${min}`
  }

  return (
    <Card>
      <Row>
        <Icon>🕓</Icon>
        <Label>Местная дата и время:</Label>
        {toStr(localDate)} (GMT{timezone >= 0 ? `+${timezone}` : timezone})
      </Row>

      <Row>
        <Icon>🕘</Icon>
        <Label>Дата и время (UTC):</Label>
        {toStr(utcDate)}
      </Row>

      <Row>
        <Icon>🌐</Icon>
        <Label>Часовой пояс:</Label>
        GMT{timezone >= 0 ? `+${timezone}` : timezone}
      </Row>

      <Divider />

      <Row>
        <Icon>📍</Icon>
        <Label>Координаты:</Label>
        широта {latitude}°, долгота {longitude}°
      </Row>

      <Row>
        <Icon>🌍</Icon>
        <Label>Место:</Label>
        {place}
      </Row>

      <Divider />

      <Row>
        <Icon>📅</Icon>
        <Label>Юлианская дата (JD):</Label>
        {jd}
      </Row>
    </Card>
  )
}

import { FC } from 'react'

import { Card, Label, Row, Icon, Divider, LabelBlock } from './index.linaria'
import { useAppSelector } from '@/store'

interface ChartSourceDataProps {
  chartId: string
}

export const NatalChartSourceData: FC<ChartSourceDataProps> = ({ chartId }) => {
  const sourceData = useAppSelector((store) => store.natalDecoding.chartsById[chartId].sourceValue)

  if (!sourceData) return null

  const { datetime, timezone, latitude, longitude, place, jd, name } = sourceData

  const toStr = (d: Date | null) => {
    if (!d || isNaN(d.getTime())) return 'не указано'

    const dd = String(d.getUTCDate()).padStart(2, '0')
    const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
    const yyyy = d.getUTCFullYear()
    const hh = String(d.getUTCHours()).padStart(2, '0')
    const min = String(d.getUTCMinutes()).padStart(2, '0')

    return `${dd}.${mm}.${yyyy} ${hh}:${min}`
  }

  const utcDate = datetime ? new Date(datetime) : null
  const timezoneOffsetMs = typeof timezone === 'number' ? timezone * 60 * 60 * 1000 : 0
  const localDate = utcDate ? new Date(utcDate.getTime() + timezoneOffsetMs) : null

  const formatTimezone =
    typeof timezone === 'number' ? `GMT${timezone >= 0 ? `+${timezone}` : timezone}` : 'не указано'
  const formatCoordinates =
    typeof latitude === 'number' && typeof longitude === 'number'
      ? `широта ${latitude}°, долгота ${longitude}°`
      : 'не указано'

  return (
    <Card>
      <Row>
        <LabelBlock>
          <Icon>🕓</Icon>
          <Label>Имя:</Label>
        </LabelBlock>
        {name ?? 'Не указано'}
      </Row>

      <Row>
        <LabelBlock>
          <Icon>🕓</Icon>
          <Label>Местная дата и время:</Label>
        </LabelBlock>
        {toStr(localDate)} {formatTimezone !== 'не указано' ? `(${formatTimezone})` : ''}
      </Row>

      <Row>
        <LabelBlock>
          <Icon>🕘</Icon>
          <Label>Дата и время (UTC):</Label>
        </LabelBlock>
        {toStr(utcDate)}
      </Row>

      <Row>
        <LabelBlock>
          <Icon>🌐</Icon>
          <Label>Часовой пояс:</Label>
        </LabelBlock>
        {formatTimezone}
      </Row>

      <Divider />

      <Row>
        <LabelBlock>
          <Icon>📍</Icon>
          <Label>Координаты:</Label>
        </LabelBlock>
        {formatCoordinates}
      </Row>

      <Row>
        <LabelBlock>
          <Icon>🌍</Icon>
          <Label>Место:</Label>
        </LabelBlock>
        {place || 'не указано'}
      </Row>

      <Divider />

      <Row>
        <LabelBlock>
          <Icon>📅</Icon>
          <Label>Юлианская дата (JD):</Label>
        </LabelBlock>
        {typeof jd === 'number' ? jd : 'не указано'}
      </Row>
    </Card>
  )
}

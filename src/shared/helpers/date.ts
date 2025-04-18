import { TZDate } from '@date-fns/tz'

export const getTimezone = (date: string, zone: string) =>
  (new TZDate(date).withTimeZone(zone).getTimezoneOffset().valueOf() / 60) * -1

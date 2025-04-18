import { TZDate } from '@date-fns/tz'
import { format, sub } from 'date-fns'
import { add } from 'date-fns/add'

export const getTimezone = (date: string, zone: string) =>
  (new TZDate(date).withTimeZone(zone).getTimezoneOffset().valueOf() / 60) * -1

// пересчитать время и дату по гринвичу (нужно дать только отклонение в часах)
export const recalculatedDate = (datetime: string, timezone: number) => {
  console.log(datetime)
  const sign = Math.sign(timezone)
  let val = new Date(datetime)

  if (sign === -1) {
    val = sub(new Date(datetime), {
      hours: Math.abs(timezone),
    })
  } else if (sign === 1) {
    val = add(new Date(datetime), {
      hours: timezone,
    })
  }

  return format(new Date(val), 'yyyy-MM-dd HH:mm:ss')
}

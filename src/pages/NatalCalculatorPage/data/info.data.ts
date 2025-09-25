import date from '../assets/info/date.png'
import place from '../assets/info/place.png'
import time from '../assets/info/time.png'

export const INFO_LIST_DATA = [
  {
    img: place,
    title: 'Место рождения',
    text: `Укажите населённый пункт, где вы родились — координаты и часовой пояс определятся автоматически.`,
  },
  {
    img: date,
    title: 'Дата рождения',
    text: `Точная календарная дата в формате ДД.ММ.ГГГГ.`,
  },
  {
    img: time,
    title: 'Время рождения',
    text: `Желательно до минут. Если точного времени нет — укажите ориентировочное (например,12:00).`,
  },
]

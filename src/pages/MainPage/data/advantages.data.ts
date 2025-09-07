import CalcImage from '../assets/advantages/calc.png'
import MapImage from '../assets/advantages/map.png'
import TablesImage from '../assets/advantages/tables.png'
import HousesImage from '../assets/advantages/houses.png'
import LearnImage from '../assets/advantages/learn.png'

export const advantagesListData = [
  {
    id: 'calc',
    title: 'Мгновенные расчёты',
    caption: 'Точная математика и астрономические эфемериды',
    image: CalcImage,
    area: 'a',
    hue: 190,
  },
  {
    id: 'map',
    title: 'Интерактивная карта',
    caption: 'Знаки, дома, аспекты — всё наглядно',
    image: MapImage,
    area: 'b',
    hue: 180,
  },
  {
    id: 'tables',
    title: 'Таблицы и сводки',
    caption: 'Аспекты, заполненность домов, орбисы',
    image: TablesImage,
    area: 'c',
    hue: 200,
  },
  {
    id: 'houses',
    title: 'Системы домов',
    caption: 'Плацидус, Кох, Равнодомные и другие — выбирай подходящую',
    image: HousesImage,
    area: 'd',
    hue: 175,
  },
  {
    id: 'learn',
    title: 'Справочник',
    caption: 'Планеты, дома, аспекты, конфигурации',
    image: LearnImage,
    area: 'e',
    hue: 210,
  },
]

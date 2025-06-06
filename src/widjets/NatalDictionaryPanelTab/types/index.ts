import {
  IAspectDictionaryItem,
  IHouseInSignDictionaryItem,
  IPlanetInHouseDictionaryItem,
  IPlanetInSignDictionaryItem,
} from '@/entities/astro-dictionary/types/dictionary-items.types'

export interface IProps {
  chartId: string
}

export interface IPlanetsInSignProps extends IProps {
  items: (IPlanetInSignDictionaryItem & { planetLongitude: number })[]
}
export interface IPlanetsInHouseProps extends IProps {
  items: IPlanetInHouseDictionaryItem[]
}
export interface IHouseInSignProps extends IProps {
  items: IHouseInSignDictionaryItem[]
}

export interface IAspectsProps extends IProps {
  items: IAspectDictionaryItem[]
}

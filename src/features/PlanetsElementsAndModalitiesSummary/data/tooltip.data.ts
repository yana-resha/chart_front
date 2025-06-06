import {
  ASTRO_ZODIAC_MODALITY_SYMBOL,
  ASTRO_ZODIAC_MODALITY_NAME,
  ASTRO_ZODIAC_ELEMENT_NAME,
  ASTRO_ZODIAC_ELEMENT_SYMBOL,
} from '@/shared/configs/astro-zodiac.config'

export const sign = `Знак — что это?

                  Знак Зодиака указывает, через какие качества и особенности проявляется энергия планеты.
                  Он показывает стиль поведения, привычные реакции и способ взаимодействия с окружающим.

                  Знак помогает понять, как человек выражает ту сферу жизни, за которую отвечает планета.`

export const modality = `Качества — что это?

                В астрологии качества (кресты) показывают, как проявляется энергия знаков и каким способом человек действует и реагирует на мир.

                ${ASTRO_ZODIAC_MODALITY_SYMBOL.mutable} ${ASTRO_ZODIAC_MODALITY_NAME.mutable} — гибкий, приспосабливается к изменениям, любит разнообразие.
                ${ASTRO_ZODIAC_MODALITY_SYMBOL.fixed} ${ASTRO_ZODIAC_MODALITY_NAME.fixed} — устойчивый, надёжный, упорно идет к своим целям.
                ${ASTRO_ZODIAC_MODALITY_SYMBOL.cardinal} ${ASTRO_ZODIAC_MODALITY_NAME.cardinal} — инициативный, активный, запускает новые процессы.

                Соотношение качеств в карте подсказывает, каких подходов к жизни больше: стабильности, движения вперёд или умения подстраиваться.`

export const element = `Стихии — что это?

                  В астрологии стихии отражают четыре базовые силы природы, через которые проявляется энергия планет и знаков.
                  Они показывают общий стиль восприятия жизни и реагирования на события:

                  ${ASTRO_ZODIAC_ELEMENT_SYMBOL.earth} ${ASTRO_ZODIAC_ELEMENT_NAME.earth} — практичность, надёжность, внимание к материальному миру.
                  ${ASTRO_ZODIAC_ELEMENT_SYMBOL.fire} ${ASTRO_ZODIAC_ELEMENT_NAME.fire} — энтузиазм, страсть, импульсивность.
                  ${ASTRO_ZODIAC_ELEMENT_SYMBOL.air} ${ASTRO_ZODIAC_ELEMENT_NAME.air} — мысль, общение, гибкость.
                  ${ASTRO_ZODIAC_ELEMENT_SYMBOL.water} ${ASTRO_ZODIAC_ELEMENT_NAME.water} — эмоции, интуиция, чувствительность.

                Соотношение стихий в натальной карте помогает понять, какие качества у человека преобладают, а какие могут быть менее выражены.`

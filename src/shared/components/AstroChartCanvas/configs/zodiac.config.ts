import Aries from '@/shared/assets/icons/zodiac-icons/Icon-1.svg'
import Capricorn from '@/shared/assets/icons/zodiac-icons/Icon-10.svg'
import Aquarius from '@/shared/assets/icons/zodiac-icons/Icon-11.svg'
import Pisces from '@/shared/assets/icons/zodiac-icons/Icon-12.svg'
import Taurus from '@/shared/assets/icons/zodiac-icons/Icon-2.svg'
import Gemini from '@/shared/assets/icons/zodiac-icons/Icon-3.svg'
import Cancer from '@/shared/assets/icons/zodiac-icons/Icon-4.svg'
import Leo from '@/shared/assets/icons/zodiac-icons/Icon-5.svg'
import Virgo from '@/shared/assets/icons/zodiac-icons/Icon-6.svg'
import Libra from '@/shared/assets/icons/zodiac-icons/Icon-7.svg'
import Scorpio from '@/shared/assets/icons/zodiac-icons/Icon-8.svg'
import Sagittarius from '@/shared/assets/icons/zodiac-icons/Icon-9.svg'
import { ASTRO_ZODIAC } from '@/shared/types/astro-zodiac'

// не менять поочередность
export const ZODIAC_SIGNS = {
  [ASTRO_ZODIAC.ARIES]: Aries,
  [ASTRO_ZODIAC.TAURUS]: Taurus,
  [ASTRO_ZODIAC.GEMINI]: Gemini,
  [ASTRO_ZODIAC.CANCER]: Cancer,
  [ASTRO_ZODIAC.LEO]: Leo,
  [ASTRO_ZODIAC.VIRGO]: Virgo,
  [ASTRO_ZODIAC.LIBRA]: Libra,
  [ASTRO_ZODIAC.SCORPIO]: Scorpio,
  [ASTRO_ZODIAC.SAGITTARIUS]: Sagittarius,
  [ASTRO_ZODIAC.CAPRICORN]: Capricorn,
  [ASTRO_ZODIAC.AQUARIUS]: Aquarius,
  [ASTRO_ZODIAC.PISCES]: Pisces,
}

// не менять поочередность
export const ZODIAC_COLORS = {
  [ASTRO_ZODIAC.ARIES]: 'rgba(244, 78, 56, 1)',
  [ASTRO_ZODIAC.TAURUS]: 'rgba(119, 179, 98, 1)',
  [ASTRO_ZODIAC.GEMINI]: 'rgba(122, 194, 234, 1)',
  [ASTRO_ZODIAC.CANCER]: 'rgba(168, 150, 186, 1)',
  [ASTRO_ZODIAC.LEO]: 'rgba(255, 170, 67, 1)',
  [ASTRO_ZODIAC.VIRGO]: 'rgba(122, 194, 234, 1)',
  [ASTRO_ZODIAC.LIBRA]: 'rgba(180, 192, 152, 1)',
  [ASTRO_ZODIAC.SCORPIO]: 'rgba(165, 94, 141, 1)',
  [ASTRO_ZODIAC.SAGITTARIUS]: 'rgba(255, 120, 0, 1)',
  [ASTRO_ZODIAC.CAPRICORN]: 'rgba(98, 102, 110, 1)',
  [ASTRO_ZODIAC.AQUARIUS]: 'rgba(116, 223, 210, 1)',
  [ASTRO_ZODIAC.PISCES]: 'rgba(138, 168, 197, 1)',
}

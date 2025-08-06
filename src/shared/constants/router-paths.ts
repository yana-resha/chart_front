export enum ROUTER_PATHES {
  DEFAULT_PATH = '/',
  DEFAULT_AUTH_PATH = '/auth',
  CALCULATOR_PATH = '/natal',
  NATAL_DECODING_PATH = '/natal/decoding',
}

export const PATH_TITLE_MAP: Record<string, string> = {
  [ROUTER_PATHES.DEFAULT_PATH]: 'Главная',
  [ROUTER_PATHES.DEFAULT_AUTH_PATH]: 'Авторизация',
  [ROUTER_PATHES.CALCULATOR_PATH]: 'Рассчитатать натальную карту',
  [ROUTER_PATHES.NATAL_DECODING_PATH]: 'Интерпретация натальной карты',
  '/components': 'Компоненты',
}

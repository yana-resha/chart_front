import { ROUTER_PATHES } from '@/shared/constants/router-paths'

export enum ServiceLinkId {
  NatalCalc = 'natal-calc',
}

export const SERVICE_LINKS: Record<ServiceLinkId, ROUTER_PATHES> = {
  [ServiceLinkId.NatalCalc]: ROUTER_PATHES.CALCULATOR_PATH,
}

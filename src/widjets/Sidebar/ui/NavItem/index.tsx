import { NavLink } from 'react-router-dom'

import { CollapsibleNavGroup } from './CollapsibleNavGroup'
import { NavRow } from './index.linaria'
import type { TNavItem } from '../../data'

type Props = {
  item: TNavItem
  onNavigate?: () => void
}

export const NavItem = ({ item, onNavigate }: Props) => {
  if (item?.type === 'group') {
    return (
      <CollapsibleNavGroup
        item={item}
        onNavigate={onNavigate}
      />
    )
  }

  return (
    <NavRow
      as={NavLink}
      to={item.path}
      onClick={onNavigate}
    >
      {item.icon}
      {item.name}
    </NavRow>
  )
}

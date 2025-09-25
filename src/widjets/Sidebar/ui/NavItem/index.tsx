import { NavLink } from 'react-router-dom'

import { CollapsibleNavGroup } from './CollapsibleNavGroup'
import { NavRow } from './index.linaria'
import { TNavItem } from '../../data'

export const NavItem = (item: TNavItem) => {
  if (item.type === 'group') {
    return <CollapsibleNavGroup item={item} />
  }

  return (
    <NavRow
      as={NavLink}
      to={item.path}
    >
      {item.icon}
      {item.name}
    </NavRow>
  )
}

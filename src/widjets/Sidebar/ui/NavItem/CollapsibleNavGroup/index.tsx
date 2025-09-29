// CollapsibleNavGroup.tsx
import { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'

import type { NavGroupItem } from '../../../data'
import {
  NavRow,
  GroupChevron,
  ChevronDown,
  GroupPanel,
  GroupInner,
  GroupList,
  ChildItem,
  childLinkPillCSS,
} from '../index.linaria'

type Props = {
  item: NavGroupItem
  onNavigate?: () => void
}

export const CollapsibleNavGroup = ({ item, onNavigate }: Props) => {
  const { pathname } = useLocation()

  const hasActiveChild = useMemo(
    () => item.children.some((c) => pathname.startsWith(c.path)),
    [pathname, item.children],
  )

  const [open, setOpen] = useState<boolean>(true)

  useEffect(() => {
    if (hasActiveChild) setOpen(true)
  }, [hasActiveChild])

  if (!item.children?.length) return null

  return (
    <div>
      <NavRow
        type="button"
        as="button"
        className={classNames({ active: hasActiveChild })}
        aria-expanded={open}
        aria-controls={`group-${item.id}`}
        onClick={() => setOpen((v) => !v)}
      >
        {item.icon}
        {item.name}
        <GroupChevron
          as="span"
          open={open}
        >
          <ChevronDown />
        </GroupChevron>
      </NavRow>

      <GroupPanel
        open={open}
        id={`group-${item.id}`}
        role="region"
        aria-label={String(item.name)}
      >
        <GroupInner>
          <GroupList>
            {item.children.map((child) => (
              <ChildItem key={child.path}>
                <NavLink
                  to={child.path}
                  className={childLinkPillCSS}
                  onClick={onNavigate}
                >
                  {child.name}
                </NavLink>
              </ChildItem>
            ))}
          </GroupList>
        </GroupInner>
      </GroupPanel>
    </div>
  )
}

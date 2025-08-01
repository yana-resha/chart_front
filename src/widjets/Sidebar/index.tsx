import { NavLink } from 'react-router-dom'

import { NAVIGATION_DATA } from './data'
import { Container, navlinkCSS, NavList, PublicAccountBlock, TopBlock } from './index.linaria'

const Sidebar = () => (
  <Container aria-label="Навигация по сайту">
    <TopBlock>
      <PublicAccountBlock />
    </TopBlock>
    <NavList>
      {NAVIGATION_DATA.map((data) => (
        <NavLink
          key={data.path}
          className={navlinkCSS}
          to={data.path}
        >
          {data.icon}
          {data.name}
        </NavLink>
      ))}
    </NavList>
  </Container>
)

export default Sidebar

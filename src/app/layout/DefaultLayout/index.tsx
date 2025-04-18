import { Outlet } from 'react-router-dom'

import { DefaultContainer, PagesContainer, SidebarContainer } from './index.linaria'
import Sidebar from '@/widjets/Sidebar'

const DefaultLayout = () => (
  <DefaultContainer>
    <SidebarContainer>
      <Sidebar />
    </SidebarContainer>
    <PagesContainer>
      <Outlet />
    </PagesContainer>
  </DefaultContainer>
)

export default DefaultLayout

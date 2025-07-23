import { Outlet } from 'react-router-dom'

import { DefaultContainer, PagesContainer, SidebarContainer, SidebarStaticWrapper } from './index.linaria'
import Sidebar from '@/widjets/Sidebar'

const DefaultLayout = () => (
  <DefaultContainer>
    <SidebarStaticWrapper>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
    </SidebarStaticWrapper>
    <PagesContainer>
      <Outlet />
    </PagesContainer>
  </DefaultContainer>
)

export default DefaultLayout

import { Layout } from './index.linaria'
import { Advantages } from './sections/Advantages'
import { Hero } from './sections/Hero'
import { Possibilities } from './sections/Possibilities'

export const MainPage = () => (
  <Layout>
    <Hero />
    <Possibilities />
    <Advantages />
  </Layout>
)

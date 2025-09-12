import { Layout } from './index.linaria'
import { Advantages } from './sections/Advantages'
import { Hero } from './sections/Hero'
import { Possibilities } from './sections/Possibilities'
import { Posts } from './sections/Posts'

export const MainPage = () => (
  <Layout>
    <Hero />
    <Possibilities />
    <Advantages />
    <Posts />
  </Layout>
)

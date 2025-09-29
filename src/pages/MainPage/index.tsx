import { Layout } from './index.linaria'
import { Advantages } from './sections/Advantages'
import { Hero } from './sections/Hero'
import { Possibilities } from './sections/Possibilities'
import { Posts } from './sections/Posts'
import { SeoHelmet } from '@/shared/components/SeoHelmet'

export const MainPage = () => (
  <Layout>
    <SeoHelmet
      title="Натальная карта онлайн бесплатно"
      description="Постройте натальную карту онлайн в ASTRODOC. Бесплатный астрологический калькулятор: гороскоп, интерпретации планет, домов и аспектов. Астрология для начинающих и профессионалов."
    />
    <Hero />
    <Possibilities />
    <Advantages />
    <Posts />
  </Layout>
)

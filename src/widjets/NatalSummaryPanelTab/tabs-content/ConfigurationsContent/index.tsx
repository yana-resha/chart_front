import { Layout } from '../index.linaria'
import { Container, Title, Description, Quote } from './index.linaria'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'

export const ConfigurationsContent = () => (
  <Layout>
    <Container>
      <Title>Раздел «Конфигурации» в разработке</Title>

      <Description>
        <a
          href="/"
          className={linkTextCss}
        >
          Конфигурации
        </a>{' '}
        — один из самых мощных инструментов в астрологии. Они объединяют отдельные аспекты в цельные структуры
        и показывают ключевые напряжения и возможности карты.
        <br />
        <br />
        В отличие от одиночных аспектов, конфигурации позволяют увидеть более глубокие закономерности и
        понять, как разные части личности или судьбы взаимодействуют между собой.
        <br />
        <br />В ближайшее время вы увидите:{' '}
        <a
          className={linkTextCss}
          href="/"
        >
          Тау-квадрат
        </a>
        ,{' '}
        <a
          className={linkTextCss}
          href="/"
        >
          Парус
        </a>
        ,{' '}
        <a
          className={linkTextCss}
          href="/"
        >
          Бисекстиль
        </a>{' '}
        и другие.
      </Description>

      <Quote>
        Разработка визуализации конфигураций уже в процессе — мы тщательно выстраиваем всё не только по коду,
        но и по натальной карте.
      </Quote>
    </Container>
  </Layout>
)

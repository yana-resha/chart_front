import { AdvantagesSection, BottomContainer, BottomDescription, SectionHead } from './index.linaria'
import { AdvantagesListData } from '../../data/advantages.data'
import { SectionHeadWrapper, SectionSubtitle, H2 } from '../../index.linaria'
import { ShowcaseList } from '@/shared/components/ShowcaseList'

export const Advantages = () => (
  <AdvantagesSection>
    <SectionHead>
      <SectionHeadWrapper>
        <H2 variant="dark">Почему именно ASTRODOC?</H2>
        <SectionSubtitle variant="dark">
          Простой и честный сервис для тех, кто хочет быстро рассчитать натальную карту.
        </SectionSubtitle>
      </SectionHeadWrapper>
    </SectionHead>

    <ShowcaseList
      items={AdvantagesListData}
      variant={'dark'}
    />

    <SectionSubtitle>
      <BottomContainer>
        <BottomDescription>
          <strong>ASTRODOC</strong> — это удобный онлайн-сервис для тех, кто хочет понять себя через
          астрологию. Здесь вы сможете бесплатно рассчитать натальную карту, увидеть положение планет и домов,
          а также получить интерпретации без скрытых ограничений. Интерактивная карта и современный интерфейс
          делают процесс простым и увлекательным, а неограниченное число расчётов позволит использовать сервис
          как для личного интереса, так и для профессиональной практики.
        </BottomDescription>
      </BottomContainer>
    </SectionSubtitle>
  </AdvantagesSection>
)

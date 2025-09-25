import { AdvantagesSection, SectionHead } from './index.linaria'
import { AdvantagesListData } from '../../data/advantages.data'
import { SectionHeadWrapper, SectionSubtitle, H2 } from '../../index.linaria'
import { ShowcaseList } from '@/shared/components/ShowcaseList'

export const Advantages = () => (
  <AdvantagesSection>
    <SectionHead>
      <SectionHeadWrapper>
        <H2 variant="light">Почему именно ASTRODOC?</H2>
        <SectionSubtitle variant="light">
          Простой и честный сервис для тех, кто хочет быстро рассчитать натальную карту.
        </SectionSubtitle>
      </SectionHeadWrapper>
    </SectionHead>

    <ShowcaseList items={AdvantagesListData} />
  </AdvantagesSection>
)

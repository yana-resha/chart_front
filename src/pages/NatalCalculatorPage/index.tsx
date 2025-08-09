import {
  Layout,
  FormWrapper,
  FormBlock,
  MarkdownText,
  BenefitCard,
  BenefitsList,
  TopBlock,
  Divider,
} from './index.linaria'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'
import { PageContentWrapper } from '@/shared/assets/styles/pages.linaria'
import { PageTitle, SectionTitle, SubSectionTitle } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import { smoothScrollAnchor } from '@/shared/helpers/smoothScrollAnchor'
import NatalCalculatorForm from '@/widjets/NatalCalculatorForm'

export const NatalCalculatorPage = () => (
  <Layout>
    <PageHeader>
      <HeaderBackButton />
    </PageHeader>
    <PageContentWrapper style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      <PageTitle>Расчёт натальной карты онлайн 💫</PageTitle>
      <TopBlock>
        <MarkdownText>
          <Divider />
          <p>
            🆓 На нашем астросервисе вы можете{' '}
            <a
              href="#calculator"
              className={linkTextCss}
              onClick={(e) => smoothScrollAnchor(e, 'calculator')}
            >
              рассчитать натальную карту онлайн
            </a>{' '}
            всего за пару минут — бесплатно и с подробными пояснениями.
          </p>
          <Divider />
          <p>
            🪐 <strong>Натальная карта</strong> — это подробная астрологическая схема, построенная на{' '}
            <em>точное время</em> и <em>место рождения</em>. Она показывает 🌌 расположение планет, Солнца,
            Луны и ключевых точек гороскопа в момент вашего появления на свет. Такой «небесный портрет»
            помогает понять особенности личности, сильные и слабые стороны, таланты, кармические задачи и
            направление, которое подсказывают звёзды ✨.
          </p>
          <Divider />
          <p>
            📊 Построение карты включает определение положения планет в знаках зодиака и домах, а также анализ
            их взаимодействий через аспекты 🔍. На основе этих данных можно глубже разобраться в себе, увидеть
            скрытые ресурсы и понять, какие события и сценарии повторяются в жизни.
          </p>

          <Divider />
          <SectionTitle>Что поможет узнать натальная карта</SectionTitle>

          <BenefitsList>
            <BenefitCard color="#16eef6">
              <div className="title">Познать свой характер</div>
              <div className="desc">
                Понять сильные и слабые стороны, увидеть, что движет вами и какие качества помогают достигать
                целей.
              </div>
            </BenefitCard>

            <BenefitCard color="#ff6b8b">
              <div className="title">Разобраться в чувствах</div>
              <div className="desc">
                Осознать, почему возникают определённые эмоции и реакции, и как они влияют на отношения.
              </div>
            </BenefitCard>

            <BenefitCard color="#ffd166">
              <div className="title">Найти точки роста</div>
              <div className="desc">
                Определить, в каких сферах жизни можно развиваться, и какие шаги приведут к результатам.
              </div>
            </BenefitCard>

            <BenefitCard color="#8ea6ff">
              <div className="title">Понять жизненные ситуации</div>
              <div className="desc">
                Разобраться, откуда берутся повторяющиеся сценарии и как их можно изменить.
              </div>
            </BenefitCard>
          </BenefitsList>
          <Divider />
          <p>
            Натальная карта не определяет вашу судьбу раз и навсегда. Но, зная её ключи, вы сможете осознанно
            влиять на события, использовать благоприятные периоды, смягчать сложные ситуации и направлять свою
            жизнь в сторону, которая откликается именно вам.
          </p>
          <Divider />
          <p>
            📌 Чтобы построить карту, потребуется несколько простых данных —{' '}
            <a
              href="#calculator-info"
              className={linkTextCss}
              onClick={(e) => smoothScrollAnchor(e, 'calculator-info')}
            >
              посмотрите, что нужно для расчёта
            </a>
            .
          </p>
          <Divider />
        </MarkdownText>
      </TopBlock>

      <FormWrapper id="calculator">
        <SectionTitle>Введите данные рождения</SectionTitle>
        <FormBlock>
          <NatalCalculatorForm />
        </FormBlock>
      </FormWrapper>

      <MarkdownText id="calculator-info">
        <SectionTitle>📊 Как работает наш калькулятор</SectionTitle>
        <p>
          После ввода данных нажмите кнопку <strong>"Рассчитать"</strong>, и система построит вашу натальную
          карту с учётом:
        </p>
        <ul>
          <li>астрономических эфемерид,</li>
          <li>часового пояса,</li>
          <li>перехода на летнее/зимнее время,</li>
          <li>географических координат населённого пункта.</li>
        </ul>
        <p>
          🔎 В результате вы получите подробную карту неба на момент вашего рождения — со всеми планетами,
          домами, аспектами и другими важными точками. Она станет основой для дальнейших{' '}
          <strong>интерпретаций, анализа и прогностических техник</strong>.
        </p>

        <SubSectionTitle>💡 Что дальше?</SubSectionTitle>
        <ul>
          <li>увидеть, в каких знаках и домах находятся ваши планеты;</li>
          <li>изучить аспекты между ними;</li>
          <li>
            перейти к <strong>расшифровкам и толкованиям</strong>;
          </li>
          <li>сохранить карту и поделиться ею.</li>
        </ul>
        <p>
          Это первый шаг в <strong>ваше астрологическое путешествие</strong> — исследование себя через звёзды
          ✨
        </p>
      </MarkdownText>
    </PageContentWrapper>
  </Layout>
)

import { Link } from 'react-router-dom'

import { BENEFIT_LIST_DATA } from './data/benefit.data'
import { INFO_LIST_DATA } from './data/info.data'
import {
  Layout,
  FormWrapper,
  MarkdownText,
  IntroductionBlock,
  Divider,
  StepCard,
  CalculationCard,
  CalculationStepsGrid,
  DataInfoBlock,
  CalculatorInstructionBlock,
  CalculationsInfoBlock,
  CalculatorCard,
  CardBody,
  CardFooter,
  CardHeader,
  CardHint,
  CardTitle,
  FooterNote,
  CardTitleRow,
  CardDivider,
  DescText,
  StepsGrid,
  StepDesc,
  BaseCardHeader,
  PostsBlock,
  PostsList,
  BenefitialBlock,
  MainTitle,
  MainDescription,
  ContentWithoutXPaddings,
  ContentWithXPaddings,
} from './index.linaria'
import { CalculationCardTerm } from './ui/CalculationCardTerm'
import { getPreviewsByTags } from '@/entities/posts/data'
import { PreviewPostCard } from '@/entities/posts/feautures/PreviewPostCard'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'
import { H2 } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import { SeoHelmet } from '@/shared/components/SeoHelmet'
import { ShowcaseList } from '@/shared/components/ShowcaseList'
import { Tooltip } from '@/shared/components/Tooltip'
import { smoothScrollAnchor } from '@/shared/helpers/smoothScrollAnchor'
import NatalCalculatorForm from '@/widjets/NatalCalculatorForm'

export const NatalCalculatorPage = () => {
  const POSTS = getPreviewsByTags(['натальная карта'])

  return (
    <Layout>
      <SeoHelmet
        title="Рассчитать натальную карту онлайн бесплатно"
        description="Калькулятор натальной карты ASTRODOC: постройте гороскоп онлайн абсолютно бесплатно. Все функции и интерпретации доступны без ограничений — для начинающих и профессионалов. Подробная расшифровка планет, домов, аспектов и конфигураций вашей астрологической карты."
      />
      <IntroductionBlock>
        <ContentWithoutXPaddings>
          <PageHeader>
            <HeaderBackButton />
          </PageHeader>
        </ContentWithoutXPaddings>
        <MainTitle>Расчёт натальной&nbsp;карты онлайн&nbsp;</MainTitle>
        <MainDescription>
          На нашем астросервисе вы можете{' '}
          {/* <a
                href="#calculator"
                className={linkTextCss}
                onClick={(e) => smoothScrollAnchor(e, 'calculator')}
              >
                {' '}
                рассчитать натальную карту онлайн{' '}
              </a>{' '} */}
          всего за пару минут&nbsp;— бесплатно и с подробными пояснениями.{' '}
        </MainDescription>
        <MarkdownText>
          <p>
            <strong>Натальная карта 🪐 </strong>&nbsp;— это подробная астрологическая схема, построенная на{' '}
            <em>точное время</em> и <em>место рождения</em>. Она показывает расположение планет, Солнца, Луны
            и ключевых точек гороскопа 🌌 в момент вашего появления на свет. Такой «небесный портрет» помогает
            понять особенности личности, сильные и слабые стороны, таланты, кармические задачи и направление,
            которое подсказывают ✨ звёзды.
          </p>
          <p>
            Построение карты 📊 включает определение положения планет в знаках зодиака и домах, а также анализ
            🔍 их взаимодействий через аспекты. На основе этих данных можно глубже разобраться в себе, увидеть
            скрытые ресурсы и понять, какие события и сценарии повторяются в жизни.{' '}
          </p>
        </MarkdownText>
        <BenefitialBlock>
          <H2>Что поможет узнать натальная карта</H2>
          <ContentWithoutXPaddings>
            <ShowcaseList items={BENEFIT_LIST_DATA} />
          </ContentWithoutXPaddings>
        </BenefitialBlock>
        <MarkdownText>
          <ContentWithoutXPaddings
            style={{ textAlign: 'center', borderBottom: '1px solid white', padding: '0.7rem 0rem' }}
          >
            <ContentWithXPaddings>
              <p>
                {' '}
                <strong>Натальная карта не определяет вашу судьбу раз и навсегда.</strong>
              </p>
              <p>
                Но, зная её ключи, вы сможете осознанно влиять на события, использовать благоприятные периоды,
                смягчать сложные ситуации и направлять свою жизнь в сторону, которая откликается именно вам.
                <span style={{ display: 'block' }}>
                  Чтобы построить карту, потребуется несколько простых данных&nbsp;—{' '}
                  <a
                    href="#data-info"
                    className={linkTextCss}
                    onClick={(e) => smoothScrollAnchor(e, 'data-info')}
                  >
                    посмотрите, что нужно для расчёта
                  </a>
                  .
                </span>
              </p>
            </ContentWithXPaddings>
          </ContentWithoutXPaddings>
        </MarkdownText>
      </IntroductionBlock>

      <FormWrapper id="calculator">
        <CalculatorCard>
          <CardHeader>
            <CardTitle>Введите данные рождения</CardTitle>
            <CardHint>Если города нет в списке&nbsp;— введите координаты вручную.</CardHint>
          </CardHeader>
          <CardBody>
            <NatalCalculatorForm />
          </CardBody>
          <CardFooter>
            <FooterNote>
              Выберите временную зону вручную или оставьте Auto&nbsp;— мы определим её автоматически.
            </FooterNote>
          </CardFooter>
        </CalculatorCard>
      </FormWrapper>

      {/* Инструкция */}
      <DataInfoBlock id="data-info">
        <H2 variant="dark">Какие данные нужны для расчёта</H2>
        <ContentWithoutXPaddings>
          <ShowcaseList
            items={INFO_LIST_DATA}
            variant="dark"
          />
        </ContentWithoutXPaddings>
        <MarkdownText variant="dark">
          <div style={{ textAlign: 'center', padding: '1.5rem 0rem 1rem 0rem' }}>
            Если не нашли свой город в списке, можете ввести его вручную. Часовой пояс при этом будет
            определён автоматически по координатам, но при необходимости вы можете выбрать его вручную 🌍
          </div>
        </MarkdownText>
      </DataInfoBlock>

      {/* Шаги заполнения */}
      <CalculatorInstructionBlock>
        <H2>Как заполнить поля в калькуляторе</H2>
        <StepsGrid>
          <StepCard>
            <BaseCardHeader>
              <CardTitleRow>1. Имя (необязательно)</CardTitleRow>
              <CardDivider />
            </BaseCardHeader>

            <StepDesc>Поможет сохранить и отличать ваши расчёты.</StepDesc>
          </StepCard>

          <StepCard>
            <BaseCardHeader>
              <CardTitleRow>2. Населённый пункт</CardTitleRow>
              <CardDivider />
            </BaseCardHeader>
            <StepDesc>
              Начните вводить название города и выберите его из списка подсказок. <br /> Либо установите флаг
              <strong> «Ввести координаты» </strong> и укажите широту и долготу вручную в десятичном формате
              (например: 55.7558, 37.6173).
            </StepDesc>
          </StepCard>

          <StepCard>
            <BaseCardHeader>
              <CardTitleRow>3. Дата</CardTitleRow>
              <CardDivider />
            </BaseCardHeader>
            <StepDesc>Выберите дату в календаре или введите вручную.</StepDesc>
          </StepCard>

          <StepCard>
            <BaseCardHeader>
              <CardTitleRow>4. Время и часовой пояс</CardTitleRow>
              <CardDivider />
            </BaseCardHeader>
            <StepDesc>
              Укажите время рождения.
              <br /> По умолчанию часовой пояс определяется автоматически по координатам места рождения, но
              при необходимости вы можете выбрать его вручную из списка.
            </StepDesc>
          </StepCard>

          <StepCard>
            <BaseCardHeader>
              <CardTitleRow>5. Система домов</CardTitleRow>
              <CardDivider />
            </BaseCardHeader>
            <StepDesc>
              Выберите систему расчёта домов или оставьте значение по умолчанию — Плацидус (самая популярная
              система).
              <br />
              <br />
              Мы подготовили подробный гайд о системах домов: как они работают и как выбрать подходящую.{' '}
              <Link
                to={'/'}
                className={linkTextCss}
              >
                Подробнее →
              </Link>
            </StepDesc>
          </StepCard>

          <StepCard>
            <BaseCardHeader>
              <CardTitleRow>6. Проверка</CardTitleRow>
              <CardDivider />
            </BaseCardHeader>
            <StepDesc>
              Проверьте город (или координаты), дату и время рождения, а также часовой пояс и систему домов.
              Убедившись, что всё указано верно, нажмите <strong>«Рассчитать»</strong>.
            </StepDesc>
          </StepCard>
        </StepsGrid>
      </CalculatorInstructionBlock>
      {/* Как считаем */}
      <CalculationsInfoBlock>
        <MarkdownText>
          <H2 variant="dark">Как мы рассчитываем вашу натальную карту</H2>

          <CalculationStepsGrid>
            <CalculationCard variant="dark">
              <BaseCardHeader>
                <CardTitleRow>1. Время и место</CardTitleRow>
                <CardDivider />
              </BaseCardHeader>
              <DescText>
                Вы вводите дату, время и населённый пункт. Мы определяем точный часовой пояс по базе данных{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'IANA Time Zone'}
                  tooltipContent="🌐 Мировая база данных часовых поясов с историческими изменениями"
                >
                  <CalculationCardTerm>IANA Time Zone</CalculationCardTerm>
                </Tooltip>
                , учитывая переходы на летнее время и другие поправки. Это позволяет перевести всё в{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'UTC'}
                  tooltipContent="🕒 Всемирное координированное время&nbsp;— стандарт для астрономических расчётов"
                >
                  <CalculationCardTerm>UTC</CalculationCardTerm>
                </Tooltip>
                .
              </DescText>
            </CalculationCard>

            <CalculationCard variant="dark">
              <BaseCardHeader>
                <CardTitleRow>2. Переход к астрономическому времени</CardTitleRow>
                <CardDivider />
              </BaseCardHeader>
              <DescText>
                Из <strong>UTC</strong> мы вычисляем{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Юлианское число'}
                  tooltipContent="📅 Число, показывающее количество дней от начальной эпохи&nbsp;— используется в астрономии"
                >
                  <CalculationCardTerm>юлианское число</CalculationCardTerm>
                </Tooltip>{' '}
                — универсальный формат, который астрономы применяют с античных времён.
              </DescText>
            </CalculationCard>

            <CalculationCard variant="dark">
              <BaseCardHeader>
                <CardTitleRow>3. Положение планет</CardTitleRow>
                <CardDivider />
              </BaseCardHeader>
              <DescText>
                С помощью точных{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Эфемериды'}
                  tooltipContent="📜 Таблицы с координатами небесных тел на каждый момент времени"
                >
                  <CalculationCardTerm>эфемерид</CalculationCardTerm>
                </Tooltip>{' '}
                мы определяем{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Геоцентрические координаты планет'}
                  tooltipContent="🌍 Это положение планет, рассчитанное с точки зрения наблюдателя на Земле. В астрологии используется именно такой подход: планеты проецируются на небесную сферу так, как их «видит» человек с Земли."
                >
                  <CalculationCardTerm>геоцентрические</CalculationCardTerm>
                </Tooltip>{' '}
                координаты планет. В расчётах учитываются{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Прецессия'}
                  tooltipContent="🔄 Медленное смещение оси вращения Земли"
                >
                  <CalculationCardTerm>прецессия</CalculationCardTerm>
                </Tooltip>{' '}
                и{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Нутация'}
                  tooltipContent="🌊 Небольшие колебания оси вращения Земли"
                >
                  <CalculationCardTerm>нутация</CalculationCardTerm>
                </Tooltip>
                .
              </DescText>
            </CalculationCard>

            <CalculationCard variant="dark">
              <BaseCardHeader>
                <CardTitleRow>4. Построение домов</CardTitleRow>
              </BaseCardHeader>
              <CardDivider />
              <DescText>
                В зависимости от выбранной вами системы домов мы рассчитываем их положение. Для этого
                используется{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Локальное звёздное время'}
                  tooltipContent="✨ Время, определяемое по звёздам, а не по Солнцу — ключевой параметр для расчёта Асцендента и домов"
                >
                  <CalculationCardTerm>локальное звёздное время</CalculationCardTerm>
                </Tooltip>
                , на его основе определяется Асцендент, МС и куспиды домов.
                <br />
                По умолчанию применяется система{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Placidus'}
                  tooltipContent="🏛 Самая популярная и распространённая система домов в современной астрологии"
                >
                  <CalculationCardTerm>Placidus</CalculationCardTerm>
                </Tooltip>
                .
              </DescText>
            </CalculationCard>

            <CalculationCard variant="dark">
              <BaseCardHeader>
                <CardTitleRow>5. Знаки зодиака</CardTitleRow>
                <CardDivider />
              </BaseCardHeader>
              <DescText>
                Эклиптика делится на 12 секторов по 30°. Мы переводим градусы положения планет в знак зодиака,
                начиная с{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="🌳 Момент, когда Солнце пересекает небесный экватор, переходя в северное полушарие"
                  mobileTitle={'Точки весеннего равноденствия'}
                >
                  <CalculationCardTerm>точки весеннего равноденствия</CalculationCardTerm>
                </Tooltip>
                .
              </DescText>
            </CalculationCard>

            <CalculationCard variant="dark">
              <BaseCardHeader>
                <CardTitleRow>6. Финальная сборка</CardTitleRow>
                <CardDivider />
              </BaseCardHeader>
              <DescText>
                На финальном этапе мы объединяем все рассчитанные элементы:{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Планеты'}
                  tooltipContent="🪐 Положение Солнца, Луны и планет в знаках Зодиака"
                >
                  <CalculationCardTerm>планеты</CalculationCardTerm>
                </Tooltip>{' '}
                в знаках,{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Дома'}
                  tooltipContent="🏠 Сферы жизни, в которых проявляется энергия планет"
                >
                  <CalculationCardTerm>дома</CalculationCardTerm>
                </Tooltip>
                ,{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Аспекты'}
                  tooltipContent="✨ Геометрические углы между планетами, показывающие взаимодействие энергий"
                >
                  <CalculationCardTerm>аспекты</CalculationCardTerm>
                </Tooltip>{' '}
                и дополнительные точки, например{' '}
                <Tooltip
                  placement="top"
                  mobileTitle={'Лунные Узлы'}
                  tooltipContent="🌙 Кармические точки — Раху и Кету, показывающие путь развития души"
                >
                  <CalculationCardTerm>Лунные Узлы</CalculationCardTerm>
                </Tooltip>
                . <br /> На основе этих данных строится интерактивная натальная карта, где можно увидеть все
                взаимосвязи.
                <br /> Параллельно наша система формирует интерпретации, чтобы вы сразу получили готовый
                разбор вашей карты.
              </DescText>
            </CalculationCard>
          </CalculationStepsGrid>
        </MarkdownText>
      </CalculationsInfoBlock>
      <Divider />
      <PostsBlock>
        <H2>Статьи по теме</H2>
        <PostsList>
          {POSTS.map((el) => (
            <PreviewPostCard
              post={el}
              key={el.slug}
            />
          ))}
        </PostsList>
      </PostsBlock>
    </Layout>
  )
}

import {
  Layout,
  FormWrapper,
  MarkdownText,
  BenefitCard,
  IntroductionBlock,
  Divider,
  StepCard,
  InstructionCard,
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
  CardIcon,
  CardDivider,
  DescText,
  PageWrapper,
  InstructionsGrid,
  StepsGrid,
  BenefitGrid,
  StepDesc,
  InstructionDesc,
  BaseCardHeader,
  PostsBlock,
  PostsList,
} from './index.linaria'
import { CalculationCardTerm } from './ui/CalculationCardTerm'
import { getPreviewsByTags } from '@/entities/posts/data'
import { PreviewPostCard } from '@/entities/posts/feautures/PreviewPostCard'
import CalendarDay from '@/shared/assets/icons/calendar-day.svg?react'
import Clock from '@/shared/assets/icons/clock.svg?react'
import PinIcon from '@/shared/assets/icons/pin-3.svg?react'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'
import { H1, H2 } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import { Tip } from '@/shared/components/Tip'
import { Tooltip } from '@/shared/components/Tooltip'
import { smoothScrollAnchor } from '@/shared/helpers/smoothScrollAnchor'
import NatalCalculatorForm from '@/widjets/NatalCalculatorForm'
import { Link } from 'react-router-dom'

export const NatalCalculatorPage = () => {
  const POSTS = getPreviewsByTags(['натальная карта'])

  return (
    <Layout>
      <PageHeader>
        <HeaderBackButton />
      </PageHeader>
      <PageWrapper>
        <IntroductionBlock>
          <H1>Расчёт натальной&nbsp;карты онлайн&nbsp;💫</H1>
          <MarkdownText>
            {' '}
            <Divider />{' '}
            <p>
              {' '}
              🆓 На нашем астросервисе вы можете{' '}
              <a
                href="#calculator"
                className={linkTextCss}
                onClick={(e) => smoothScrollAnchor(e, 'calculator')}
              >
                {' '}
                рассчитать натальную карту онлайн{' '}
              </a>{' '}
              всего за пару минут&nbsp;— бесплатно и с подробными пояснениями.{' '}
            </p>{' '}
            <Divider />{' '}
            <p>
              {' '}
              🪐 <strong>Натальная карта</strong>&nbsp;— это подробная астрологическая схема, построенная на{' '}
              <em>точное время</em> и <em>место рождения</em>. Она показывает 🌌 расположение планет, Солнца,
              Луны и ключевых точек гороскопа в момент вашего появления на свет. Такой «небесный портрет»
              помогает понять особенности личности, сильные и слабые стороны, таланты, кармические задачи и
              направление, которое подсказывают звёзды ✨.{' '}
            </p>{' '}
            <Divider />{' '}
            <p>
              {' '}
              📊 Построение карты включает определение положения планет в знаках зодиака и домах, а также
              анализ их взаимодействий через аспекты 🔍. На основе этих данных можно глубже разобраться в
              себе, увидеть скрытые ресурсы и понять, какие события и сценарии повторяются в жизни.{' '}
            </p>{' '}
            <Divider />
            <H2>Что поможет узнать натальная карта</H2>
            <BenefitGrid>
              <BenefitCard color="#16eef6">
                <div className="title">Характер и потенциал</div>
                <DescText>
                  Помогает понять сильные и слабые стороны, внутренние мотивы и качества, которые
                  поддерживают/оставнавливают на пути к целям.
                </DescText>
              </BenefitCard>
              <BenefitCard color="#ff6b8b">
                <div className="title">Эмоции и чувства</div>
                <DescText>
                  Показывает, откуда берутся реакции и переживания, и как они влияют на отношения с людьми.
                </DescText>
              </BenefitCard>
              <BenefitCard color="#ffd166">
                <div className="title">Точки роста</div>
                <DescText>
                  Помогает определить сферы жизни, где есть возможности для развития и новые шаги, ведущие к
                  результатам.
                </DescText>
              </BenefitCard>
              <BenefitCard color="#8ea6ff">
                <div className="title">Жизненные сценарии</div>
                <DescText>
                  Раскрывает повторяющиеся ситуации и даёт ключи к тому, как изменить их в свою пользу.
                </DescText>
              </BenefitCard>
            </BenefitGrid>
            <Divider />
            <p>
              {' '}
              <strong>Натальная карта не определяет вашу судьбу раз и навсегда.</strong> Но, зная её ключи, вы
              сможете осознанно влиять на события, использовать благоприятные периоды, смягчать сложные
              ситуации и направлять свою жизнь в сторону, которая откликается именно вам.{' '}
            </p>
            <Divider />
            <p>
              📌 Чтобы построить карту, потребуется несколько простых данных&nbsp;—{' '}
              <a
                href="#data-info"
                className={linkTextCss}
                onClick={(e) => smoothScrollAnchor(e, 'data-info')}
              >
                посмотрите, что нужно для расчёта
              </a>
              .
            </p>
            <Divider />
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
          <MarkdownText>
            <H2>Какие данные нужны для расчёта</H2>

            <InstructionsGrid>
              <InstructionCard>
                <BaseCardHeader>
                  <CardTitleRow>
                    <CardIcon>
                      <PinIcon />
                    </CardIcon>{' '}
                    Место рождения
                  </CardTitleRow>
                  <CardDivider />
                </BaseCardHeader>
                <InstructionDesc>
                  Укажите населённый пункт, где вы родились — координаты и часовой пояс определятся
                  автоматически.
                </InstructionDesc>
              </InstructionCard>

              <InstructionCard>
                <BaseCardHeader>
                  <CardTitleRow>
                    <CardIcon>
                      <CalendarDay />
                    </CardIcon>{' '}
                    Дата рождения
                  </CardTitleRow>
                  <CardDivider />
                </BaseCardHeader>
                <InstructionDesc>Точная календарная дата в формате ДД.ММ.ГГГГ.</InstructionDesc>
              </InstructionCard>

              <InstructionCard>
                <BaseCardHeader>
                  <CardTitleRow>
                    <CardIcon>
                      <Clock />
                    </CardIcon>{' '}
                    Время рождения
                  </CardTitleRow>
                  <CardDivider />
                </BaseCardHeader>

                <InstructionDesc>
                  Желательно до минут. Если точного времени нет&nbsp;— укажите ориентировочное (например,
                  <strong>12:00</strong>).
                </InstructionDesc>
              </InstructionCard>
            </InstructionsGrid>
            <Tip smile="🌍">
              Если не нашли свой город в списке, можете ввести его вручную. Часовой пояс при этом будет
              определён автоматически по координатам, но при необходимости вы можете выбрать его вручную.
            </Tip>
          </MarkdownText>
        </DataInfoBlock>

        {/* Шаги заполнения */}
        <Divider />
        <CalculatorInstructionBlock>
          <MarkdownText>
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
                  Начните вводить название города и выберите его из списка подсказок. <br /> Либо установите
                  флаг
                  <strong> «Ввести координаты» </strong> и укажите широту и долготу вручную в десятичном
                  формате (например: 55.7558, 37.6173).
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
                  <br /> По умолчанию часовой пояс определяется автоматически по координатам места рождения,
                  но при необходимости вы можете выбрать его вручную из списка.
                </StepDesc>
              </StepCard>

              <StepCard>
                <BaseCardHeader>
                  <CardTitleRow>5. Система домов</CardTitleRow>
                  <CardDivider />
                </BaseCardHeader>
                <StepDesc>
                  Выберите систему расчёта домов или оставьте значение по умолчанию — Плацидус (самая
                  популярная система).
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
                  Проверьте город (или координаты), дату и время рождения, а также часовой пояс и систему
                  домов. Убедившись, что всё указано верно, нажмите <strong>«Рассчитать»</strong>.
                </StepDesc>
              </StepCard>
            </StepsGrid>
            <Tip smile="🕒">
              Если точное время рождения неизвестно, можно указать примерное (например, 12:00). На положение
              планет в знаках это не повлияет, а вот дома и Асцендент могут отличаться.
            </Tip>
          </MarkdownText>
        </CalculatorInstructionBlock>

        {/* Как считаем */}
        <Divider />
        <CalculationsInfoBlock>
          <MarkdownText>
            <H2>Как мы рассчитываем вашу натальную карту</H2>

            <CalculationStepsGrid>
              <CalculationCard>
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
                    <CalculationCardTerm style={{ color: '#8ea6ff' }}>IANA Time Zone</CalculationCardTerm>
                  </Tooltip>
                  , учитывая переходы на летнее время и другие поправки. Это позволяет перевести всё в{' '}
                  <Tooltip
                    placement="top"
                    mobileTitle={'UTC'}
                    tooltipContent="🕒 Всемирное координированное время&nbsp;— стандарт для астрономических расчётов"
                  >
                    <CalculationCardTerm style={{ color: '#ffd166' }}>UTC</CalculationCardTerm>
                  </Tooltip>
                  .
                </DescText>
              </CalculationCard>

              <CalculationCard>
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
                    <CalculationCardTerm style={{ color: '#f78da7' }}>юлианское число</CalculationCardTerm>
                  </Tooltip>{' '}
                  — универсальный формат, который астрономы применяют с античных времён.
                </DescText>
              </CalculationCard>

              <CalculationCard>
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
                    <CalculationCardTerm style={{ color: '#16eef6' }}>эфемерид</CalculationCardTerm>
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
                    <CalculationCardTerm style={{ color: '#ff9f68' }}>прецессия</CalculationCardTerm>
                  </Tooltip>{' '}
                  и{' '}
                  <Tooltip
                    placement="top"
                    mobileTitle={'Нутация'}
                    tooltipContent="🌊 Небольшие колебания оси вращения Земли"
                  >
                    <CalculationCardTerm style={{ color: '#c792ea' }}>нутация</CalculationCardTerm>
                  </Tooltip>
                  .
                </DescText>
              </CalculationCard>

              <CalculationCard>
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
                    <CalculationCardTerm style={{ color: '#6ad4a8' }}>
                      локальное звёздное время
                    </CalculationCardTerm>
                  </Tooltip>
                  , на его основе определяется Асцендент, МС и куспиды домов.
                  <br />
                  По умолчанию применяется система{' '}
                  <Tooltip
                    placement="top"
                    mobileTitle={'Placidus'}
                    tooltipContent="🏛 Самая популярная и распространённая система домов в современной астрологии"
                  >
                    <CalculationCardTerm style={{ color: '#4ba3f7' }}>Placidus</CalculationCardTerm>
                  </Tooltip>
                  .
                </DescText>
              </CalculationCard>

              <CalculationCard>
                <BaseCardHeader>
                  <CardTitleRow>5. Знаки зодиака</CardTitleRow>
                  <CardDivider />
                </BaseCardHeader>
                <DescText>
                  Эклиптика делится на 12 секторов по 30°. Мы переводим градусы положения планет в знак
                  зодиака, начиная с{' '}
                  <Tooltip
                    placement="top"
                    tooltipContent="🌳 Момент, когда Солнце пересекает небесный экватор, переходя в северное полушарие"
                    mobileTitle={'Точки весеннего равноденствия'}
                  >
                    <CalculationCardTerm style={{ color: '#a2f78d' }}>
                      точки весеннего равноденствия
                    </CalculationCardTerm>
                  </Tooltip>
                  .
                </DescText>
              </CalculationCard>

              <CalculationCard>
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
                    <CalculationCardTerm style={{ color: '#f5b642' }}>планеты</CalculationCardTerm>
                  </Tooltip>{' '}
                  в знаках,{' '}
                  <Tooltip
                    placement="top"
                    mobileTitle={'Дома'}
                    tooltipContent="🏠 Сферы жизни, в которых проявляется энергия планет"
                  >
                    <CalculationCardTerm style={{ color: '#6ad4a8' }}>дома</CalculationCardTerm>
                  </Tooltip>
                  ,{' '}
                  <Tooltip
                    placement="top"
                    mobileTitle={'Аспекты'}
                    tooltipContent="✨ Геометрические углы между планетами, показывающие взаимодействие энергий"
                  >
                    <CalculationCardTerm style={{ color: '#e67dd1' }}>аспекты</CalculationCardTerm>
                  </Tooltip>{' '}
                  и дополнительные точки, например{' '}
                  <Tooltip
                    placement="top"
                    mobileTitle={'Лунные Узлы'}
                    tooltipContent="🌙 Кармические точки — Раху и Кету, показывающие путь развития души"
                  >
                    <CalculationCardTerm style={{ color: '#4ba3f7' }}>Лунные Узлы</CalculationCardTerm>
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
      </PageWrapper>
    </Layout>
  )
}

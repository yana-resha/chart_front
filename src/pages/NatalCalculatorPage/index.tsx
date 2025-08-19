import {
  Layout,
  FormWrapper,
  MarkdownText,
  BenefitCard,
  IntroductionBlock,
  Divider,
  StepCard,
  Tip,
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
  Badge,
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
} from './index.linaria'
import CalendarDay from '@/shared/assets/icons/calendar-day.svg?react'
import Clock from '@/shared/assets/icons/clock.svg?react'
import PinIcon from '@/shared/assets/icons/pin-3.svg?react'
import { linkTextCss } from '@/shared/assets/styles/links.linaria'
import { PageTitle, SectionTitle } from '@/shared/assets/styles/titles.linaria'
import { HeaderBackButton } from '@/shared/components/HeaderBackButton'
import { PageHeader } from '@/shared/components/PageHeader'
import { Tooltip } from '@/shared/components/Tooltip'
import { smoothScrollAnchor } from '@/shared/helpers/smoothScrollAnchor'
import NatalCalculatorForm from '@/widjets/NatalCalculatorForm'

export const NatalCalculatorPage = () => (
  <Layout>
    <PageHeader>
      <HeaderBackButton />
    </PageHeader>
    <PageWrapper style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
      <IntroductionBlock>
        <PageTitle>Расчёт натальной карты онлайн&nbsp;💫</PageTitle>
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
            всего за пару минут — бесплатно и с подробными пояснениями.{' '}
          </p>{' '}
          <Divider />{' '}
          <p>
            {' '}
            🪐 <strong>Натальная карта</strong> — это подробная астрологическая схема, построенная на{' '}
            <em>точное время</em> и <em>место рождения</em>. Она показывает 🌌 расположение планет, Солнца,
            Луны и ключевых точек гороскопа в момент вашего появления на свет. Такой «небесный портрет»
            помогает понять особенности личности, сильные и слабые стороны, таланты, кармические задачи и
            направление, которое подсказывают звёзды ✨.{' '}
          </p>{' '}
          <Divider />{' '}
          <p>
            {' '}
            📊 Построение карты включает определение положения планет в знаках зодиака и домах, а также анализ
            их взаимодействий через аспекты 🔍. На основе этих данных можно глубже разобраться в себе, увидеть
            скрытые ресурсы и понять, какие события и сценарии повторяются в жизни.{' '}
          </p>{' '}
          <Divider />
          <SectionTitle>Что поможет узнать натальная карта</SectionTitle>
          <BenefitGrid>
            <BenefitCard color="#16eef6">
              <div className="title">Познать свой характер</div>
              <DescText>
                Понять сильные и слабые стороны, увидеть, что движет вами и какие качества помогают достигать.
              </DescText>
            </BenefitCard>
            <BenefitCard color="#ff6b8b">
              <div className="title">Разобраться в чувствах</div>
              <DescText>
                Осознать, почему возникают определённые эмоции и реакции, и как они влияют на отношения.
              </DescText>
            </BenefitCard>
            <BenefitCard color="#ffd166">
              <div className="title">Найти точки роста</div>
              <DescText>
                Определить, в каких сферах жизни можно развиваться, и какие шаги приведут к результатам.
              </DescText>
            </BenefitCard>
            <BenefitCard color="#8ea6ff">
              <div className="title">Понять жизненные ситуации</div>
              <DescText>Разобраться, откуда берутся повторяющиеся сценарии и как их можно изменить.</DescText>
            </BenefitCard>
          </BenefitGrid>
          <Divider />
          <p>
            {' '}
            Натальная карта не определяет вашу судьбу раз и навсегда. Но, зная её ключи, вы сможете осознанно
            влиять на события, использовать благоприятные периоды, смягчать сложные ситуации и направлять свою
            жизнь в сторону, которая откликается именно вам.{' '}
          </p>
          <Divider />
          <p>
            📌 Чтобы построить карту, потребуется несколько простых данных —{' '}
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
            <CardHint>Если города нет в списке — введите координаты вручную.</CardHint>
          </CardHeader>
          <CardBody>
            <NatalCalculatorForm />
          </CardBody>
          <CardFooter>
            <FooterNote>Если ввели координаты вручную — не забудьте выбрать часовой пояс.</FooterNote>
          </CardFooter>
        </CalculatorCard>
      </FormWrapper>

      {/* Инструкция */}
      <DataInfoBlock id="data-info">
        <MarkdownText>
          <SectionTitle>Какие данные нужны для расчёта</SectionTitle>

          <InstructionsGrid>
            <InstructionCard>
              <CardTitleRow>
                <CardIcon>
                  <PinIcon />
                </CardIcon>{' '}
                Место рождения
              </CardTitleRow>
              <CardDivider />
              <InstructionDesc>
                Населённый пункт, где вы родились. По нему автоматически определяются координаты и пояс.
              </InstructionDesc>
            </InstructionCard>

            <InstructionCard>
              <CardTitleRow>
                <CardIcon>
                  <CalendarDay />
                </CardIcon>{' '}
                Дата рождения
              </CardTitleRow>
              <CardDivider />
              <InstructionDesc>Точная календарная дата в формате ДД.ММ.ГГГГ.</InstructionDesc>
            </InstructionCard>

            <InstructionCard>
              <CardTitleRow>
                <CardIcon>
                  <Clock />
                </CardIcon>{' '}
                Время рождения
              </CardTitleRow>
              <CardDivider />
              <InstructionDesc>
                Желательно до минут. Если точного времени нет — укажите ориентировочное (например, 12:00).
              </InstructionDesc>
            </InstructionCard>
          </InstructionsGrid>
        </MarkdownText>
      </DataInfoBlock>

      {/* Шаги заполнения */}
      <Divider />
      <CalculatorInstructionBlock>
        <MarkdownText>
          <SectionTitle>Как заполнить поля в калькуляторе</SectionTitle>

          <StepsGrid>
            <StepCard>
              <CardTitleRow>
                <Badge>1</Badge> Имя (необязательно)
              </CardTitleRow>
              <CardDivider />
              <StepDesc>Поможет сохранить и отличать ваши расчёты.</StepDesc>
            </StepCard>

            <StepCard>
              <CardTitleRow>
                <Badge>2</Badge> Населённый пункт
              </CardTitleRow>
              <CardDivider />
              <StepDesc>Начните вводить город — выберите из подсказки…</StepDesc>
            </StepCard>

            <StepCard>
              <CardTitleRow>
                <Badge>3</Badge> Дата
              </CardTitleRow>
              <CardDivider />
              <StepDesc>Выберите дату в календаре или введите вручную.</StepDesc>
            </StepCard>

            <StepCard>
              <CardTitleRow>
                <Badge>4</Badge> Время и часовой пояс
              </CardTitleRow>
              <CardDivider />
              <StepDesc>Укажите время рождения. Пояс будет «Auto» по городу…</StepDesc>
            </StepCard>

            <StepCard>
              <CardTitleRow>
                <Badge>5</Badge> Проверка
              </CardTitleRow>
              <CardDivider />
              <StepDesc>
                Убедитесь, что все данные указаны верно и нажмите <strong>«Рассчитать»</strong>.
              </StepDesc>
            </StepCard>
          </StepsGrid>

          <Tip>
            💡 Если точное время рождения неизвестно, укажите примерное (например, 12:00). Планеты по знакам
            сохранятся, но дома и Асцендент могут отличаться.
          </Tip>
        </MarkdownText>
      </CalculatorInstructionBlock>

      {/* Как считаем */}
      <Divider />
      <CalculationsInfoBlock>
        <MarkdownText>
          <SectionTitle>Как мы рассчитываем вашу натальную карту</SectionTitle>

          <CalculationStepsGrid>
            <CalculationCard>
              <CardTitleRow>
                <Badge>1</Badge>
                Время и место
              </CardTitleRow>
              <CardDivider />
              <DescText>
                Вы вводите дату, время и населённый пункт. Мы определяем точный часовой пояс по базе данных{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="🌐 Мировая база данных часовых поясов с историческими изменениями"
                >
                  <span
                    className="term"
                    style={{ color: '#8ea6ff' }}
                  >
                    IANA Time Zone
                  </span>
                </Tooltip>
                , учитывая переходы на летнее время и другие поправки. Это позволяет перевести всё в{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="🕒 Всемирное координированное время — стандарт для астрономических расчётов"
                >
                  <span
                    className="term"
                    style={{ color: '#ffd166' }}
                  >
                    UTC
                  </span>
                </Tooltip>
                .
              </DescText>
            </CalculationCard>

            <CalculationCard>
              <CardTitleRow>
                <Badge>2</Badge>
                Переход к астрономическому времени
              </CardTitleRow>
              <CardDivider />
              <DescText>
                Из UTC мы вычисляем{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="📅 Число, показывающее количество дней от начальной эпохи — используется в астрономии"
                >
                  <span
                    className="term"
                    style={{ color: '#f78da7' }}
                  >
                    юлианское число
                  </span>
                </Tooltip>{' '}
                — универсальный формат, который астрономы применяют с античных времён.
              </DescText>
            </CalculationCard>

            <CalculationCard>
              <CardTitleRow>
                <Badge>3</Badge>
                Положение планет
              </CardTitleRow>
              <CardDivider />
              <DescText>
                С помощью точных{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="📜 Таблицы с координатами небесных тел на каждый момент времени"
                >
                  <span
                    className="term"
                    style={{ color: '#16eef6' }}
                  >
                    эфемерид
                  </span>
                </Tooltip>{' '}
                мы определяем геоцентрические координаты планет. В расчётах учитываются{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="🔄 Медленное смещение оси вращения Земли"
                >
                  <span
                    className="term"
                    style={{ color: '#ff9f68' }}
                  >
                    прецессия
                  </span>
                </Tooltip>{' '}
                и{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="🌊 Небольшие колебания оси вращения Земли"
                >
                  <span
                    className="term"
                    style={{ color: '#c792ea' }}
                  >
                    нутация
                  </span>
                </Tooltip>
                .
              </DescText>
            </CalculationCard>

            <CalculationCard>
              <CardTitleRow>
                <Badge>4</Badge>
                Построение домов
              </CardTitleRow>
              <CardDivider />
              <DescText>
                Мы вычисляем{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="✨ Время, определяемое по звёздам, а не по Солнцу — важно для расчёта Асцендента"
                >
                  <span
                    className="term"
                    style={{ color: '#6ad4a8' }}
                  >
                    локальное звёздное время
                  </span>
                </Tooltip>
                , чтобы определить Асцендент, МС и куспиды домов в системе{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="🏛 Одна из самых распространённых систем домификации в астрологии"
                >
                  <span
                    className="term"
                    style={{ color: '#4ba3f7' }}
                  >
                    Placidus
                  </span>
                </Tooltip>
                .
              </DescText>
            </CalculationCard>

            <CalculationCard>
              <CardTitleRow>
                <Badge>5</Badge>
                Знаки зодиака
              </CardTitleRow>
              <CardDivider />
              <DescText>
                Эклиптика делится на 12 секторов по 30°. Мы переводим градусы положения планет в знак зодиака,
                начиная с{' '}
                <Tooltip
                  placement="top"
                  tooltipContent="🌳 Момент, когда Солнце пересекает небесный экватор, переходя в северное полушарие"
                >
                  <span
                    className="term"
                    style={{ color: '#a2f78d' }}
                  >
                    точки весеннего равноденствия
                  </span>
                </Tooltip>
                .
              </DescText>
            </CalculationCard>

            <CalculationCard>
              <CardTitleRow>
                <Badge>6</Badge>
                Финальная сборка
              </CardTitleRow>
              <CardDivider />
              <DescText>
                Мы объединяем планеты, дома, аспекты и другие точки, строим интерактивную карту и
                подготавливаем для вас интерпретации.
              </DescText>
            </CalculationCard>
          </CalculationStepsGrid>
        </MarkdownText>
      </CalculationsInfoBlock>

      <Divider />
    </PageWrapper>
  </Layout>
)

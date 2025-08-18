import { useFormInside } from './hooks/useFormInside'
import { TimeGridRow, FormContainer, CoordsGridRow, LocalityTooltipContent } from './index.linaria'
import { HOUSE_SYSTEM_LIST, TIMEZONE_LIST } from '@/entities/astro-charts/data/calculator'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'
import InfoIcon from '@/shared/assets/icons/info-circle.svg?react'
import Pin3 from '@/shared/assets/icons/pin-3.svg?react'
import { SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'
import { formIconCSS } from '@/shared/assets/styles/icons.linaria'
import { Button } from '@/shared/components/Button'
import { Checkbox } from '@/shared/components/Checkbox'
import { LatitudeInput, LongitudeInput } from '@/shared/components/CoordInputs'
import { CustomSelect } from '@/shared/components/CustomSelect'
import Input from '@/shared/components/Input'
import { AlertModal } from '@/shared/components/Modal'
import { SearchInput } from '@/shared/components/SearchInput'
import { useFormikWrapper } from '@/shared/hooks/useFormikWrapper'

export const Form = () => {
  const {
    isSubmitting,
    submitForm,
    timezoneHadleChange,
    values,
    localitiesList,
    isLocalitiesError,
    isLocalitiesLoading,
    localitiesClickHandler,
    resetLocality,
    showErrorToast,
    closeErrorToast,
  } = useFormInside()

  const {
    value: nameValue,
    handleChange: nameHandleChange,
    isError: isNameError,
    error: nameError,
  } = useFormikWrapper(CalculatorRequestKeys.name)

  const {
    value: dateValue,
    handleChange: dateHadleChange,
    isError: isDateError,
    error: dateError,
  } = useFormikWrapper(CalculatorRequestKeys.date)
  const {
    value: timeValue,
    handleChange: timeHadleChange,
    isError: isTimeError,
    error: timeError,
  } = useFormikWrapper(CalculatorRequestKeys.time)
  const { value: enterCoordValue, handleChange: enterCoordHandleChange } =
    useFormikWrapper('enter_coordinates')
  const { value: searchLocalityValue, handleChange: searchLocalityHadleChange } =
    useFormikWrapper('searchLocality')

  const {
    value: localityValue,
    isError: isLocalityInvalid,
    error: localityInvalidText,
  } = useFormikWrapper('locality')
  const {
    handleChange: latitudeHadleChange,
    isError: isLatitudeError,
    error: latitudeError,
  } = useFormikWrapper(CalculatorRequestKeys.latitude)
  const {
    handleChange: longitudeHadleChange,
    isError: isLongitudeError,
    error: longitudeError,
  } = useFormikWrapper(CalculatorRequestKeys.longitude)

  const { value: houseSystemValue, handleChange: houseSystemHadleChange } = useFormikWrapper(
    CalculatorRequestKeys.hsys,
  )

  /* useEffect(() => {
    const obj = {
      id: '539283',
      geonameid: '539283',
      asciiname: 'Kumertau',
      asciiname_ru: 'Кумертау',
      latitude: '52.76493000',
      longitude: '55.78785000',
      elevation: null,
      country: 'RU',
      admin1_id: 'RU.08',
      admin2_id: null,
      time_zone: 'Asia/Yekaterinburg',
      admin2_data: null,
      content: 'Кумертay, Республика Башкортостан, Россия',
      admin1_data: {
        geonameid: 'RU.08',
        asciiname: 'Bashkortostan Republic',
        asciiname_ru: 'Республика Башкортостан',
        country: 'RU',
      },
      country_data: {
        iso: 'RU',
        name: 'Russia',
        name_ru: 'Россия',
      },
    }

    localitiesClickHandler(undefined, obj)
  }, []) */

  return (
    <FormContainer>
      <Input
        type="text"
        defaultValue={nameValue}
        onChange={(e) => nameHandleChange(e.currentTarget.value)}
        label="Имя"
        invalid={isNameError}
        invalidText={isNameError ? nameError : ''}
      />
      <SearchInput
        tooltip={
          localityValue ? (
            <LocalityTooltipContent>
              <div>{localityValue?.content}</div>
              <div>Широта: {localityValue.latitude}</div>
              <div>Долгота: {localityValue.longitude}</div>
              <div>Часовой пояс: {localityValue.time_zone}</div>
            </LocalityTooltipContent>
          ) : undefined
        }
        value={searchLocalityValue}
        onChange={(e) => searchLocalityHadleChange(e.target.value)}
        isClearOnFocus={localityValue ? true : false}
        leftIcon={<Pin3 className={formIconCSS} />}
        label={'Населенный пункт'}
        placeholder="Укажите населенный пункт"
        dropdownList={(localitiesList ?? []).map((obj) => ({
          ...obj,
          content: [
            obj.asciiname_ru,
            obj.admin2_data?.asciiname_ru,
            obj.admin1_data?.asciiname_ru,
            obj.country_data?.name_ru,
          ]
            .filter((el) => el)
            .join(', '),
          id: obj.geonameid,
        }))}
        onClickItem={localitiesClickHandler}
        clearValueFunc={resetLocality}
        listIsLoading={isLocalitiesLoading}
        invalid={isLocalityInvalid}
        invalidText={isLocalityInvalid ? localityInvalidText : ''}
        isError={isLocalitiesError}
        error={{
          title: 'Ошибка сервера',
          description: 'Попробуйте изменить поисковой запрос или перезагрузить страницу.',
        }}
      />
      <CoordsGridRow>
        <LatitudeInput
          label="Широта"
          disabled={!enterCoordValue}
          value={values.latitude}
          onChange={latitudeHadleChange}
          invalid={isLatitudeError}
          invalidText={isLatitudeError ? latitudeError : ''}
        />
        <LongitudeInput
          label="Долгота"
          disabled={!enterCoordValue}
          value={values.longitude}
          onChange={longitudeHadleChange}
          invalid={isLongitudeError}
          invalidText={isLongitudeError ? longitudeError : ''}
        />
      </CoordsGridRow>
      <Checkbox
        checked={enterCoordValue}
        label="Ввести координаты"
        onChange={(e) => enterCoordHandleChange(e.currentTarget.checked)}
      />
      <Input
        type="date"
        defaultValue={dateValue}
        onChange={(e) => dateHadleChange(e.currentTarget.value)}
        label="Дата"
        invalid={isDateError}
        invalidText={isDateError ? dateError : ''}
      />
      <TimeGridRow>
        <Input
          type="time"
          step={60}
          defaultValue={timeValue}
          onChange={(e) => {
            const val = e.currentTarget.value
            if (!val) {
              timeHadleChange(undefined) // если пусто → undefined
            } else {
              timeHadleChange(val) // HH:MM → HH:MM:00
            }
          }}
          label="Время"
          invalid={isTimeError}
          invalidText={isTimeError ? timeError : ''}
        />
        <CustomSelect
          label="Часовой пояс"
          values={
            values.is_timezone_auto
              ? TIMEZONE_LIST.filter((el) => el.default)
              : [TIMEZONE_LIST.find((el) => el.value === values.timezone) ?? TIMEZONE_LIST[0]]
          }
          setValues={timezoneHadleChange}
          optionsList={TIMEZONE_LIST}
        />
      </TimeGridRow>
      <CustomSelect
        label="Система домов"
        values={[
          HOUSE_SYSTEM_LIST.find((el) => el.value === houseSystemValue) ??
            HOUSE_SYSTEM_LIST.find((el) => el.default) ??
            HOUSE_SYSTEM_LIST[0],
        ]}
        setValues={(el) => houseSystemHadleChange(el.value)}
        optionsList={HOUSE_SYSTEM_LIST}
      />
      <Button
        isLoading={isSubmitting}
        onClick={submitForm}
      >
        Рассчитать
      </Button>
      {showErrorToast && (
        <AlertModal
          showExitCross={true}
          title={'Упс...'}
          subtitle={
            <>
              Похоже что то сломалось. <br /> Попробуйте повторить загрузку.
            </>
          }
          primaryButtonText={'Повторить'}
          onPrimaryClick={submitForm}
          secondaryButtonText={'Отмена'}
          icon={<InfoIcon stroke={SHARED_COLORS_VARIABLES.ERROR_COLOR} />}
          onClose={closeErrorToast}
        />
      )}
    </FormContainer>
  )
}

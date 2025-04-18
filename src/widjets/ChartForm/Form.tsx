import { useForm } from './hooks/useForm'
import { TimeGridRow, FormContainer, CoordsGridRow } from './index.linaria'
import { CALCULATOR_TYPES } from '@/entities/astro-charts/data/calculator'
import { TIMEZONE_LIST } from '@/entities/astro-charts/data/calculator'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator'
import Pin3 from '@/shared/assets/icons/pin-3.svg?react'
import StarSVG from '@/shared/assets/icons/Star.svg?react'
import { formIconCSS } from '@/shared/assets/styles/icons.linaria'
import { Button } from '@/shared/components/Button'
import { Checkbox } from '@/shared/components/Checkbox'
import { CustomSelect } from '@/shared/components/CustomSelect'
import Input from '@/shared/components/Input'
import { SearchInput } from '@/shared/components/SearchInput'
import { useFormikWrapper } from '@/shared/hooks/useFormikWrapper'

export const Form = () => {
  const {
    isSubmitting,
    handlerBtnSubmit,
    timezoneHadleChange,
    values,
    localitiesList,
    isLocalitiesError,
    isLocalitiesLoading,
    localitiesClickHandler,
    resetLocality,
  } = useForm()

  const { value: typeValue, handleChange: typeHandleChange } = useFormikWrapper(CalculatorRequestKeys.type)
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

  return (
    <FormContainer>
      <CustomSelect
        label="Тип карты"
        values={CALCULATOR_TYPES.filter((el) => el.value === typeValue)}
        leftIcon={<StarSVG className={formIconCSS} />}
        setValues={(val) => typeHandleChange(val.value)}
        optionsList={CALCULATOR_TYPES}
      />
      {!enterCoordValue ? (
        <SearchInput
          tooltip={
            localityValue ? (
              <div>
                <div>{localityValue?.content}</div>
                <div>Широта: {localityValue.latitude}</div>
                <div>Долгота: {localityValue.longitude}</div>
                <div>Часовой пояс: {localityValue.time_zone}</div>
              </div>
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
      ) : (
        <CoordsGridRow>
          <Input
            value={values.latitude}
            invalid={isLatitudeError}
            invalidText={isLatitudeError ? latitudeError : ''}
            onChange={(e) => latitudeHadleChange(e.currentTarget.value.replaceAll('_', ''))}
            maskPlaceholder="__.____"
            mask="99.9999"
            label="Широта"
          />
          <Input
            value={values.longitude}
            invalid={isLongitudeError}
            invalidText={isLongitudeError ? longitudeError : ''}
            onChange={(e) => longitudeHadleChange(e.currentTarget.value.replaceAll('_', ''))}
            maskPlaceholder="__.____"
            mask="99.9999"
            label="Долгота"
          />
        </CoordsGridRow>
      )}
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
          step={1}
          defaultValue={timeValue}
          onChange={(e) => timeHadleChange(e.currentTarget.value)}
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
      <Button
        roundedCorner
        onClick={handlerBtnSubmit}
      >
        Рассчитать
      </Button>
    </FormContainer>
  )
}

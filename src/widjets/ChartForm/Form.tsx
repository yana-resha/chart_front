import { useEffect } from 'react'

import { useFormInside } from './hooks/useFormInside'
import { TimeGridRow, FormContainer, CoordsGridRow, modalWrapper } from './index.linaria'
import { CALCULATOR_TYPES } from '@/entities/astro-charts/data/calculator'
import { TIMEZONE_LIST } from '@/entities/astro-charts/data/calculator'
import { CalculatorRequestKeys } from '@/entities/astro-charts/types/calculator-request.types'
import InfoIcon from '@/shared/assets/icons/info-circle.svg?react'
import Pin3 from '@/shared/assets/icons/pin-3.svg?react'
import StarSVG from '@/shared/assets/icons/Star.svg?react'
import { SHARED_COLORS_VARIABLES } from '@/shared/assets/styles/colors'
import { formIconCSS } from '@/shared/assets/styles/icons.linaria'
import { Button } from '@/shared/components/Button'
import { Checkbox } from '@/shared/components/Checkbox'
import { CustomSelect } from '@/shared/components/CustomSelect'
import { FadeWrapper } from '@/shared/components/FadeWrapper/FadeWrapper'
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

  useEffect(() => {
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
  }, [])

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
          step={0}
          defaultValue={timeValue}
          onChange={(e) => timeHadleChange(e.currentTarget.value + ':00')}
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
        isLoading={isSubmitting}
        roundedCorner
        onClick={submitForm}
      >
        Рассчитать
      </Button>
      <FadeWrapper
        show={showErrorToast}
        className={modalWrapper}
      >
        <AlertModal
          showExitCross={true}
          title={'Ошибка сервера'}
          subtitle={'Прозошла ошибка сервера, попробуйте повторить отправку'}
          primaryButtonText={'Повторить'}
          onPrimaryClick={submitForm}
          secondaryButtonText={'Отмена'}
          icon={<InfoIcon stroke={SHARED_COLORS_VARIABLES.ERROR_COLOR} />}
          onClose={closeErrorToast}
        />
      </FadeWrapper>
    </FormContainer>
  )
}

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const UseI18n = () => {
  const { i18n } = useTranslation('global')
  const [lng, setLng] = useState(navigator.language)

  // use effect to change language in I18n when browser change
  useEffect(() => {
    i18n.changeLanguage(lng)
    console.log('useEffect langue change with I18N')
  }, [lng, i18n])
  // use effect to detect change language
  useEffect(() => {
    const handleLanguageChange = () => {
      setLng(navigator.language)
      console.log('UseEffect langue change with navigator')
    }

    window.addEventListener('languagechange', handleLanguageChange)

    return () => {
      window.removeEventListener('languagechange', handleLanguageChange)
    }
  }, [])
  const handleChangeLanguage = (lang) => {
    console.log(lang)
    i18n.changeLanguage(lang)
  }
  return {
    lng,
    i18n,
    handleChangeLanguage,
  }
}

export default UseI18n

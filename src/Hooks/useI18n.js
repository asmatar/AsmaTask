import { useEffect /*,  useState  */ } from 'react'
import { useTranslation } from 'react-i18next'
import useLocalStorage from './useLocalStorage'
const UseI18n = () => {
  const { i18n } = useTranslation('global')
  // const [lng, setLng] = useState(navigator.language)
  // use effect to change language in I18n when browser change
  const [lng, setLng] = useLocalStorage('lng', '')
  useEffect(() => {
    i18n.changeLanguage(lng)
  }, [lng, i18n])
  // use effect to detect change language
  useEffect(() => {
    const handleLanguageChange = () => {
      setLng(navigator.language)
    }

    window.addEventListener('languagechange', handleLanguageChange)

    return () => {
      window.removeEventListener('languagechange', handleLanguageChange)
    }
  }, [])
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }
  return {
    lng,
    i18n,
    handleChangeLanguage,
  }
}

export default UseI18n

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './Components/UI/Header'
import { useTranslation } from 'react-i18next'

import { Suspense, lazy, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './Components/ErrorFallback'

import { ThemeProvider, styled } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from '@/components/Themes'
import LangButton from '@/Components/UI/LangButton'

const Boards = lazy(() => import('@/Pages/Boards/Boards'))
const Board = lazy(() => import('@/Pages/Board/Board'))
const Login = lazy(() => import('@/Pages/Login/Login'))
const Register = lazy(() => import('@/Pages/Register/Register'))

function App() {
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
  const navigate = useNavigate()
  const [theme, setTheme] = useState('light')
  const isDarkTheme = theme === 'dark'
  const toggleTheme = () => setTheme(isDarkTheme ? 'light' : 'dark')

  const handleChangeLanguage = (lang) => {
    console.log(lang)
    i18n.changeLanguage(lang)
  }
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => navigate('/')}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Boards />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/board/:id" element={<Board />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
        <LangContainer>
          <LangButton
            currentLang={i18n.language}
            onClick={() => handleChangeLanguage('en')}
          >
            en
          </LangButton>
          <LangButton
            currentLang={i18n.language}
            onClick={() => handleChangeLanguage('es')}
          >
            es
          </LangButton>
          <LangButton
            currentLang={i18n.language}
            onClick={() => handleChangeLanguage('fr')}
          >
            fr
          </LangButton>
        </LangContainer>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App

const LangContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: fixed;
  bottom: 10px;
  left: 10px;
`

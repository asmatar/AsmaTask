import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { lightTheme, darkTheme, GlobalStyles } from '@/Components/Themes'
import ErrorFallback from '@/Components/ErrorFallback'
import LangButton from '@/Components/UI/LangButton'
import Header from '@/Components/UI/Header'
import Spinner from '@/Components/UI/spinner'
import ProtectedRoute from '@/Components/ProtectedRoute'
import ProtectedRouteLog from '@/Components/ProtectedRouteLog'

import { useUserAuth } from '@/Context/authContext'

import UseI18n from './Hooks/useI18n'
import useLocalStorage from './Hooks/useLocalStorage'

import { ThemeProvider, styled } from 'styled-components'

const Boards = lazy(() => import('@/Pages/Boards/Boards'))
const Board = lazy(() => import('@/Pages/Board/Board'))
const Login = lazy(() => import('@/Pages/Login/Login'))
const Register = lazy(() => import('@/Pages/Register/Register'))

function App() {
  const { user } = useUserAuth()
  const navigate = useNavigate()
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const { i18n, handleChangeLanguage } = UseI18n()
  const isDarkTheme = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark')
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Header toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => navigate('/')}
      >
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Boards />
                </ProtectedRoute>
              }
            />
            <Route
              path="/board/:id"
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRouteLog>
                  <Login />
                </ProtectedRouteLog>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRouteLog>
                  <Register />
                </ProtectedRouteLog>
              }
            />
            <Route
              path="*"
              element={
                user !== null ? <Navigate to="/" /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
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
      <ToastContainer />
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

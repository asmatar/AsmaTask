import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Header from './Components/UI/Header'

import { Suspense, lazy } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './Components/ErrorFallback'

import { ThemeProvider, styled } from 'styled-components'
import { lightTheme, darkTheme, GlobalStyles } from '@/components/Themes'
import LangButton from '@/Components/UI/LangButton'
import UseI18n from './Hooks/useI18n'
import ProtectedRoute from '@/Components/ProtectedRoute'
import ProtectedRouteLog from '@/Components/ProtectedRouteLog'
import { useUserAuth } from '@/Context/authContext'
import Spinner from '@/Components/UI/spinner'
import useLocalStorage from './Hooks/useLocalStorage'
const Boards = lazy(() => import('@/Pages/Boards/Boards'))
const Board = lazy(() => import('@/Pages/Board/Board'))
const Login = lazy(() => import('@/Pages/Login/Login'))
const Register = lazy(() => import('@/Pages/Register/Register'))

function App() {
  const { user } = useUserAuth()
  const navigate = useNavigate()
  /*   const [theme, setTheme] = useState('light') */
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const isDarkTheme = theme === 'dark'
  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark')
  }

  const { i18n, handleChangeLanguage } = UseI18n()
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
              path="*"
              element={user ? <Navigate to="/" /> : <Navigate to="/login" />}
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

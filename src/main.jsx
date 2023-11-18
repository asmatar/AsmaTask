import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter as Router } from 'react-router-dom'
import { UserAuthContextProvider } from '@/Context/AuthContext'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <I18nextProvider i18n={i18n}>
        <UserAuthContextProvider>
          <App />
        </UserAuthContextProvider>
      </I18nextProvider>
    </Router>
  </React.StrictMode>
)

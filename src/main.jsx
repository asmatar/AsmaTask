import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter as Router } from 'react-router-dom'
import { UserAuthContextProvider } from '@/Context/AuthContext'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { Provider } from 'react-redux'
import store from '@/RTK/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <UserAuthContextProvider>
            <App />
          </UserAuthContextProvider>
        </I18nextProvider>
      </Provider>
    </Router>
  </React.StrictMode>
)

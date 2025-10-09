import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/RouterApp.jsx'
import './index.css'
import './context/settings.css'

import { ChatProvider } from './context/ChatContext.jsx'
import { SettingsProvider } from './context/SettingsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SettingsProvider>
      <ChatProvider>
        <RouterApp />
      </ChatProvider>
    </SettingsProvider>
  </StrictMode>,
)

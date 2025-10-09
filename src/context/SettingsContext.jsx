import { createContext, useContext, useEffect, useMemo, useState } from "react"

const SettingsContext = createContext()

const TRANSLATIONS = {
  es: {
    appTitle: "Clon de Whatsapp",
    loginAccess: "Contraseña de acceso",
    loginPlaceholder: "Ingrese la contraseña",
    loginButton: "Acceder",
    restricted: "Acceso restringido • Contenido privado",
    search: "Search...",
    noSearch: "No search found...",
    lastSeen: "Last seen",
    enterText: "Escribe un mensaje...",
    logout: "Cerrar sesión",
    settings: "Configuración",
    language: "Idioma",
    spanish: "Español",
    english: "Inglés",
    energySaving: "Ahorro de energía (oscuro)",
    back: "Volver"
  },
  en: {
    appTitle: "WhatsApp Clone",
    loginAccess: "Access password",
    loginPlaceholder: "Enter password",
    loginButton: "Sign in",
    restricted: "Restricted access • Private content",
    search: "Search...",
    noSearch: "No results...",
    lastSeen: "Last seen",
    enterText: "Type a message...",
    logout: "Log out",
    settings: "Settings",
    language: "Language",
    spanish: "Spanish",
    english: "English",
    energySaving: "Energy saving (dark)",
    back: "Back"
  }
}

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "es")
  const [energySaving, setEnergySaving] = useState(() => localStorage.getItem("energy") === "1")

  // persistencia y clase para tema oscuro
  useEffect(() => {
    localStorage.setItem("lang", language)
  }, [language])

  useEffect(() => {
    localStorage.setItem("energy", energySaving ? "1" : "0")
    const cls = "energy"
    const el = document.documentElement
    if (energySaving) el.classList.add(cls)
    else el.classList.remove(cls)
  }, [energySaving])

  const t = useMemo(() => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.es
    return (key) => dict[key] ?? key
  }, [language])

  const value = {
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((p) => (p === "es" ? "en" : "es")),
    energySaving,
    setEnergySaving,
    toggleEnergySaving: () => setEnergySaving((p) => !p),
    t,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)

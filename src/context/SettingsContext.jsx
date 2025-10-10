import { createContext, useContext, useEffect, useMemo, useState } from "react"

const SettingsContext = createContext()

const TRANSLATIONS = {
  es: {
    appTitle: "Clon de Whatsapp",
    loginAccess: "Contraseña de acceso",
    loginPlaceholder: "Ingrese la contraseña",
    loginButton: "Acceder",
    restricted: "Acceso restringido • Contenido privado",
    search: "buscador...",
    noSearch: "No search found...",
    lastSeen: "Last seen",
    enterText: "Escribe un mensaje...",
    logout: "Cerrar sesión",
    settings: "Configuración",
    language: "Idioma",
    spanish: "Español",
    english: "Inglés",
    energySaving: "Ahorro de energía (oscuro)",
    back: "Volver",
    help: "Ayuda",
    switchOn: "Encendido",
    switchOff: "Apagado",
    
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
    back: "Back",
    help: "Help",
    switchOn: "On",
    switchOff: "Off"
  }
}

export function SettingsProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("lang") || "es")
  const [energySaving, setEnergySaving] = useState(() => localStorage.getItem("energy") === "1")

  
  // NEW: estado del popup (modal) de Settings
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const openSettings = () => setIsSettingsOpen(true)
  const closeSettings = () => setIsSettingsOpen(false)
  const toggleSettings = () => setIsSettingsOpen(v => !v)

  // persistencia y idioma
  useEffect(() => {
    localStorage.setItem("lang", language)
  }, [language])

  //persistencia ahorro de energia
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

    //control del popup
    isSettingsOpen,
    openSettings,
    closeSettings,
    toggleSettings,
  }
   const onBackdrop = (e) => { if (e.target === e.currentTarget) closeSettings() }

  return <SettingsContext.Provider value={value}>
    {children}
    
    {isSettingsOpen && (
      
        <div className="modal-backdrop" onMouseDown={onBackdrop}>
          <div className="modal" role="dialog" aria-modal="true" aria-label={t("settings")}>
            <div className="modal-header">
              <h3>{t("settings")}</h3>
              <button className="close-btn" onClick={closeSettings} aria-label={t("back")}>×</button>
            </div>

            <div className="modal-body">
              <div className="field">
                <label>{t("language")}</label>
                <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
                  <option value="es">{t("spanish")}</option>
                  <option value="en">{t("english")}</option>
                </select>
              </div>

              <div className="field">
                <label>{t("energySaving")}</label>
                <button
                  type="button"
                  className={`button ${energySaving ? "primary" : ""}`}
                  onClick={() => setEnergySaving(!energySaving)}
                  aria-pressed={energySaving}
                >
                  {energySaving ? t("on") : t("off")}
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button className="button" onClick={closeSettings}>{t("back")}</button>
            </div>
          </div>
        </div>
      )}

  </SettingsContext.Provider>
}

export const useSettings = () => useContext(SettingsContext)

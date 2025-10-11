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
    lastSeen: "ultima vez",
    enterText: "Escribe un mensaje...",
    logout: "Cerrar sesión",
    settings: "Configuración",
    language: "Idioma",
    spanish: "Español",
    english: "Inglés",
    energySaving: "Ahorro de energía ",
    back: "Volver",
    help: "Ayuda",
    on: "Encendido",
    off: "Apagado",
    lastSeen: "Últ. vez",
    online: "en línea",
    offline: "desconectado",
    attach: "Adjuntar",
    gallery: "Galería",
    contact: "Contactos",
    document: "Documento",
    audio: "Audio",
    location: "Ubicación",
    help: "Ayuda",
    selectContact: "Seleccionar contacto",
    selectContactHint: "clic en la lista izquierda",
    sendMessage: "Enviar mensaje",
    sendMessageHint: "escribí abajo y Enter o botón ➤",
    whatIsThisApp: "¿Qué es esta app?",
    helpIntro: "Clon simple de WhatsApp para practicar: contactos, mensajes y ajustes (idioma y modo energía).",
    quickControls: "Controles rápidos",
    attach: "Adjuntar",
    attachHint: "abre el menú de adjuntos (Galería, Contacto, Documento, Audio, Ubicación).",
    selectContact: "Seleccionar contacto",
    selectContactHint: "clic en la lista izquierda",
    sendMessage: "Enviar mensaje",
    sendMessageHint: "escribí abajo y Enter o botón ➤",
    settingsHint: "abre el popup para idioma y ahorro de energía",
    logoutHint: "botón ✖ en la barra superior",
    keyboardShortcuts: "Atajos de teclado",
    kbEnter: "enviar mensaje",
    kbEsc: "cerrar popups/menús abiertos",
    kbTab: "navegar por los controles",
    darkMode: "Modo oscuro / Ahorro de energía",
    darkModeHint: "Activá Ahorro de energía en Configuración: ajusta colores, hace el clip blanco y oscurece el menú de adjuntos.",
    commonIssues: "Problemas comunes",
    reloadIfBlank: "Si algo se ve en blanco, recargá la página.",
    resetData: "Para reiniciar datos:",
    and: "y",
  },
  en: {
    appTitle: "WhatsApp Clone",
    loginAccess: "Access password",
    loginPlaceholder: "Enter password",
    loginButton: "Sign in",
    restricted: "Restricted access • Private content",
    search: "search...",
    noSearch: "No results...",
    lastSeen: "Last see",
    enterText: "Type a message...",
    logout: "Log out",
    settings: "Settings",
    language: "Language",
    spanish: "Spanish",
    english: "English",
    energySaving: "Energy saving ",
    back: "Back",
    help: "Help",
    on: "On",
    off: "Off",
    online: "online",
    offline: "offline",
    attach: "Attach",
    gallery: "Gallery",
    contact: "Contacts",
    document: "Document",
    audio: "Audio",
    help: "Help",
    locatio: "Location",
    selectContact: "Select contact",
    selectContactHint: "click on the left list",
    sendMessage: "Send message",
    sendMessageHint: "type below and press Enter or ➤ button",
    whatIsThisApp: "What is this app?",
    helpIntro: "Simple WhatsApp clone to practice: contacts, messages, and settings (language and energy mode).",
    quickControls: "Quick controls",
    attach: "Attach",
    attachHint: "opens the attachments menu (Gallery, Contact, Document, Audio, Location).",
    selectContact: "Select contact",
    selectContactHint: "click on the left list",
    sendMessage: "Send message",
    sendMessageHint: "type below and press Enter or ➤ button",
    settingsHint: "opens the popup for language and energy saving",
    logoutHint: "✖ button on the top bar",
    keyboardShortcuts: "Keyboard shortcuts",
    kbEnter: "send message",
    kbEsc: "close open popups/menus",
    kbTab: "navigate through controls",
    darkMode: "Dark mode / Energy saving",
    darkModeHint: "Enable Energy saving in Settings: adjusts colors, makes the clip white and darkens the attachments menu.",
    commonIssues: "Common issues",
    reloadIfBlank: "If the page is blank, reload it.",
    resetData: "To reset data:",
    and: "and",
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

  return  <SettingsContext.Provider value={value}>
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
                  aria-pressed={energySaving}>
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

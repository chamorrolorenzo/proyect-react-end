import { useNavigate } from "react-router-dom"
import { useSettings } from "../context/SettingsContext"
import "../views/help.css"
import clipIconUrl from "../assets/images/vertical-paperclip-outline-tall.svg?url"

export default function Help() {
  const navigate = useNavigate()
  const { t } = useSettings()

  return (
    <main>
      <h1>{t("help")}</h1>
      <section>
       <h2>{t("whatIsThisApp") ?? "¿Qué es esta app?"}</h2>
        <p>{t("helpIntro") ??
            "Clon simple de WhatsApp para practicar: contactos, mensajes y ajustes (idioma y modo energía)."}
        </p>
      </section>
      <section>
        <h2>{t("quickControls") ?? "Controles rápidos"}</h2>
        <ul>
          <li><strong><img src={clipIconUrl} alt="" aria-hidden="true" className="help-clip-icon"/>
              {" "}{t("attach")}:</strong>{" "}
           {t("attachHint") ?? "abre el menú de adjuntos (Galería, Contacto, Documento, Audio, Ubicación)."}{" "}
          </li>

           <li><strong>{t("selectContact")}:</strong> {t("selectContactHint")}
          </li>

          <li><strong>{t("sendMessage")}:</strong> {t("sendMessageHint")}</li>
          
          <li><strong>⚙️ {t("settings")}:</strong>{" "}
            {t("settingsHint") ?? "abre el popup para idioma y ahorro de energía"}
          </li>
          
          <li>
            <strong>{t("logout")}:</strong>{" "}
            {t("logoutHint") ?? "botón ✖ en la barra superior"}
          </li>

        </ul>
      </section>
      <section>
        <h2>{t("keyboardShortcuts") ?? "Atajos de teclado"}</h2>
        <ul>
          <li><strong>Enter:</strong> {t("kbEnter") ?? "enviar mensaje"}</li>
          <li><strong>Esc:</strong> {t("kbEsc") ?? "cerrar popups/menús abiertos"}</li>
          <li><strong>Tab:</strong> {t("kbTab") ?? "navegar por los controles"}</li>
        </ul>
      </section>
      <button type="button" onClick={() => navigate(-1)}>
        ← {t("back")}
      </button>
    </main>
  )
}

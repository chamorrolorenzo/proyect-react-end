import { useNavigate } from "react-router-dom"
import { useSettings } from "../context/SettingsContext"
import "../views/help.css"


export default function Help() {
  const navigate = useNavigate()
  const { t } = useSettings()

  return (
    <main>
      <h1>Ayuda</h1>

      <section>
        <h2>¿Qué es esta app?</h2>
        <p>Clon simple de WhatsApp para practicar: contactos, mensajes y ajustes (idioma y modo energía).</p>
      </section>

      <section>
        <h2>Controles rápidos</h2>
        <ul>
          <li><strong>Seleccionar contacto:</strong> clic en la lista izquierda.</li>
          <li><strong>Enviar mensaje:</strong> escribí abajo y Enter o botón ➤.</li>
          <li><strong>⚙️ {t("settings")}:</strong> abre el popup para idioma y ahorro de energía.</li>
          <li><strong>Cerrar sesión:</strong> botón ✖ en la barra superior.</li>
        </ul>
      </section>

      <section>
        <h2>Problemas comunes</h2>
        <ul>
          <li>Si algo se ve en blanco, recargá la página.</li>
          <li>Para reiniciar datos: borra <code>localStorage.users</code> y <code>localStorage.selectedUser</code>.</li>
        </ul>
      </section>

      <button onClick={() => navigate(-1)}>← Volver</button>
    </main>
  )
}

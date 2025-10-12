import { useSettings } from "../context/SettingsContext"
import { useNavigate } from "react-router-dom"
import "../context/settings.css"

export default function Settings() {
  const { language, setLanguage, energySaving, toggleEnergySaving, t } = useSettings()
  const navigate = useNavigate()

  return (
    <main className="settings">
      <h1>{t("settings")}</h1>
      <section className="settings-car">
        <h2>{t("language")}</h2>
        <div >
          <button onClick={() => setLanguage("es")}>
            {t("spanish")}
          </button>
          <button onClick={() => setLanguage("en")}>
            {t("english")}
          </button>
        </div>
      </section>

      <section>
       <label className="settings-toggle">
          <input type="checkbox" checked={energySaving} onChange={toggleEnergySaving} />
          {t("energySaving")}
        </label>
      </section>

      <div className="settings-actions">
        <button onClick={() => navigate(-1)}>
          ← {t("back")}
        </button>
      </div>
    </main>
  )
}

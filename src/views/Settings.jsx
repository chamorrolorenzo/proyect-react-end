import { useSettings } from "../context/SettingsContext"
import { useNavigate } from "react-router-dom"

export default function Settings() {
  const { language, setLanguage, energySaving, toggleEnergySaving, t } = useSettings()
  const navigate = useNavigate()

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>{t("settings")}</h1>

      <section style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <h2 style={{ marginTop: 0, fontSize: 16 }}>{t("language")}</h2>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => setLanguage("es")}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: language === "es" ? "2px solid black" : "1px solid #d1d5db",
              background: "white",
              cursor: "pointer"
            }}
          >
            {t("spanish")}
          </button>
          <button
            onClick={() => setLanguage("en")}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: language === "en" ? "2px solid black" : "1px solid #d1d5db",
              background: "white",
              cursor: "pointer"
            }}
          >
            {t("english")}
          </button>
        </div>
      </section>

      <section style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input type="checkbox" checked={energySaving} onChange={toggleEnergySaving} />
          {t("energySaving")}
        </label>
      </section>

      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d1d5db", background: "white", cursor: "pointer" }}
        >
          ← {t("back")}
        </button>
      </div>
    </main>
  )
}

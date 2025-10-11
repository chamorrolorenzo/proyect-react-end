
import "./Clip.css"
import { useSettings } from "../context/SettingsContext";
import defaultClipIcon from "../assets/images/vertical-paperclip-outline-tall.svg?url";

export default function Clip({ iconUrl = defaultClipIcon }) {
   const { t } = useSettings();

  return (
    <div className="clip">
      <button type="button" className="clip-btn" aria-label={t("attach")} aria-haspopup="menu" title={t("attach")}>
        <img src={iconUrl} alt="" aria-hidden="true" className="clip-icon" />
      </button>

      <ul className="clip-menu" role="menu">
        <li><button role="menuitem" className="clip-item"><span aria-hidden="true">🖼️</span><span>{t("gallery")}</span></button></li>
        <li><button role="menuitem" className="clip-item"><span aria-hidden="true">👤</span><span>{t("contact")}</span></button></li>
        <li><button role="menuitem" className="clip-item"><span aria-hidden="true">📄</span><span>{t("document")}.</span></button></li>
        <li><button role="menuitem" className="clip-item"><span aria-hidden="true">🎤</span><span>{t("audio")}</span></button></li>
        <li><button role="menuitem" className="clip-item"><span aria-hidden="true">📍</span><span>{t("location")}</span></button></li>
      </ul>
    </div>
  );
}

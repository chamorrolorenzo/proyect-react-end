import { useState } from "react"
import { useChat } from "../context/ChatContext"
import { useNavigate } from "react-router-dom";
import { useSettings } from "../context/SettingsContext";
import Clip from "../views/Clip";

export default function Chat() {
  const [msg, setMsg] = useState("")

  const { users, selectedUser, setUsers, setSelectedUser} = useChat()
  // agregamos Hook para navegacion automatica
  const navigate = useNavigate();
  //traduccion
  const { t, openSettings } = useSettings()
  // 2. Buscamos el usuario activo
 const user = users.find(u => Number(u.id) === Number(selectedUser))

  if (!user) {
    return (
      <div className="user-not-found">
        <p>No hay usuario seleccionado...</p>
      </div>
    )
  }

  // 3. Manejo del input
  const handleChange = (event) => {
    setMsg(event.target.value)
  }

  // 4. Cuando enviamos el formulario
  const handleSubmit = (event) => {
    event.preventDefault()

    const newMessage = {
      id: crypto.randomUUID(),
      text: msg,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // ✅ Actualizamos el estado de manera INMUTABLE
    const updatedUsers = users.map(u =>
      u.id === user.id
        ? { ...u, messages: [...u.messages, newMessage] }
        : u
    )

    setUsers(updatedUsers) //dispara el useEffect del contexto que guarda en localStorage
    setMsg("")
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="chat">
      <header className="chat-header">
        <div>
          <div className="chat-user">

            {/* flecha de volver a contactos para movile */}
            <button type="button" className="back-btn" onClick={() => setSelectedUser(null)}
              title={t("back")} aria-label={t("back")}> ←
            </button>
                       
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
              alt={user.name} className="chat-avatar"/>
            <strong>{user.name}</strong>
            {user.lastSeen !== "" && <span className="last-seen">Last seen: {user.lastSeen}</span>}
          </div>
        </div>

        <div className="chat-actions">
           <Clip />
          <button title="Gallery">🖼️</button>
                <button title={t("settings")} onClick={openSettings}>⚙️</button>

          <button title={t("help")} onClick={() => navigate("/help")}>❓</button>
          
          <button title={t("logout")} onClick={handleLogout} className="logout-btn"> ✖ 
          </button>
        </div>
      </header>

      <section className="chat-messages">
        {user.messages.map((message) => (
          <div className="message" key={message.id}>
            <p>{message.text}</p>
            <span className="time">{message.time}</span>
          </div>
        ))}
      </section>

      <footer className="chat-footer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={t("Entertext")}
            onChange={handleChange}
            value={msg}
          />
          <button>➤</button>
        </form>
      </footer>
    </div>
  )
}

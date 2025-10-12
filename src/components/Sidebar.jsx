import { useState, useEffect, useRef } from "react"
import { useChat } from "../context/ChatContext"
import { useSettings } from "../context/SettingsContext"


export default function Sidebar() {
   const { t } = useSettings()

  const { users, setSelectedUser } = useChat()
  const [usersToRender, setUsersToRender] = useState(users)

  const inputRef = useRef(null)
  
  // 🔄 actualizamos la lista a renderizar
  useEffect(() => { setUsersToRender(users)
  }, [users])

  // 🔍 Filtro por búsqueda
  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    const result = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    )
    setUsersToRender(result)
  }

   // seleccionar contacto y limpia input + restaurar lista
  const handleSelect = (user) => {
    setSelectedUser(Number(user.id));
      if (inputRef.current) inputRef.current.value = "" 
      setUsersToRender(users) 
    }
  
  return (
    <div className="sidebar">
      <input ref ={inputRef}
        type="text"
        placeholder={t("search")} 
        className="search"
        onChange={handleChange}/>

      {usersToRender.length === 0 &&
        ( (<p className="search-result">{t("noSearch")}</p>)
      )}

      <ul className="user-list">
        {usersToRender.map((user) => (
          <li
            key={user.id}
            onClick={() => handleSelect(user)}  
            className="user">
            <img
              className="avatar"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
              alt={user.name}/>
            <div className="user-info">
              <strong>
                <span style={{
                  color: user.status === "online" ?
                  "green" : "red", marginRight: "3px"
                  }}> •
                </span>{user.name}
              </strong>
              <small>
                {user.status === "offline" ?  user.lastSeen : "online"}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

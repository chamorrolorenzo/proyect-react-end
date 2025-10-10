import Chat from "../components/Chat"
import Sidebar from "../components/Sidebar"
import { ChatProvider } from "../context/ChatContext"

const Messages = () => {
  return (
       <div className="app">
        <Sidebar />
        <Chat />
      </div>
    
  )
}

export { Messages }
import { useChat } from "../context/ChatContext";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Messages = () => {
  const { selectedUser } = useChat();

  
  
 return (
    <div className={`app ${selectedUser != null ? "has-selection" : ""}`}>
      <Sidebar />
      <Chat />
    </div>
  );
};

export { Messages };

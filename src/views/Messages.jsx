import { useChat } from "../context/ChatContext";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Messages = () => {
  const { selectedUser } = useChat();
  const hasSelection = selectedUser !== null && selectedUser !==undefined;

  return (
    <div className={`app ${selectedUser ? "has-selection" : ""}`}>
      <Sidebar />
      <Chat />
    </div>
  );
};

export { Messages };

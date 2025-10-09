import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "../views/Login";
import { Messages } from "../views/Messages";
import { NotFound } from "../views/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";
import Settings from "../views/Settings"

const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          } />
        
        <Route
          path="/Settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export { RouterApp }
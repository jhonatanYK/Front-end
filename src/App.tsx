import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Listagem from "./components/Listagem";
import { getToken, logout } from "./services/authService";

const App: React.FC = () => {
  const [view, setView] = useState<"login" | "register" | "dashboard">("login");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const isValid = validateToken(token);
      if (isValid === true) {
        setView("dashboard");
      } else {
        logout();
        setView("login");
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleLogout = async () => {
    try {
      await logout();
      setView("login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {view === "login" && <Login switchView={() => setView("register")} />}
      {view === "register" && <Register switchView={() => setView("login")} />}
      {view === "dashboard" && (
        <div>
          <h2 className="text-lg font-bold mb-4">Bem-vindo ao Dashboard!</h2>
          <Listagem />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 mt-4"
            aria-label="Sair do Dashboard"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

function validateToken(token: string): boolean {
  // Aqui você pode implementar a validação real do token,
  // por exemplo, decodificando o JWT ou consultando o backend.
  // Por enquanto, está apenas como exemplo:
  return !!token;
}
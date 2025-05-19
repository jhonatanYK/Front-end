import React, { useState } from "react";
import { login } from "../services/authService";

// Define as propriedades esperadas pelo componente Login
interface LoginProps {
  switchView: () => void; // Função para alternar para a tela de cadastro
}

// Componente funcional Login, recebe switchView como prop
const Login: React.FC<LoginProps> = ({ switchView }) => {
  // Estados para armazenar email, senha e mensagem de erro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Função chamada ao clicar no botão "Entrar"
  const handleLogin = async () => {
    try {
      await login(email, password); // Tenta fazer login com email e senha informados
      window.location.reload();     // Recarrega a página após login bem-sucedido
    } catch {
      setError("Credenciais inválidas."); // Se der erro, exibe mensagem de erro
    }
  };

  // Renderiza o formulário de login
  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Login</h2>
      {/* Exibe mensagem de erro, se houver */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {/* Campo de email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      {/* Campo de senha */}
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      {/* Botão para enviar o formulário de login */}
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 w-full rounded mb-2">
        Entrar
      </button>
      {/* Botão para alternar para a tela de cadastro */}
      <button
        onClick={switchView}
        className="bg-green-500 text-white px-4 py-2 w-full rounded"
        type="button"
      >
        Cadastre-se
      </button>
    </div>
  );
};

export default Login;
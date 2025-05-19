import React, { useState } from "react";
import { register } from "../services/authService";

interface RegisterProps {
  switchView: () => void;
}

const Register: React.FC<RegisterProps> = ({ switchView }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      setSuccess("Cadastro realizado com sucesso! Faça login.");
      setError("");
    } catch {
      setError("Erro ao cadastrar. Tente novamente.");
      setSuccess("");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Cadastro</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 w-full rounded mb-2">
        Cadastrar
      </button>
      <button
        onClick={switchView}
        className="bg-blue-500 text-white px-4 py-2 w-full rounded"
        type="button"
      >
        Voltar para Login
      </button>
    </div>
  );
};

export default Register;
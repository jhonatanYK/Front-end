import React, { useEffect, useState } from "react";
import { getToken, getUsers } from "../services/authService";

interface User {
  id: number;
  name: string;
  email: string;
}

const Listagem: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("Token não encontrado. Faça login novamente.");
          setLoading(false);
          return;
        }
        const data = await getUsers(token);
        setUsers(data);
      } catch (err) {
        setError("Erro ao buscar usuários. Faça login novamente.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Carregando usuários...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-xl">
      <h2 className="text-lg font-bold mb-4">Lista de Usuários</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Nome</th>
            <th className="border px-2 py-1">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-2 py-1">{user.id}</td>
              <td className="border px-2 py-1">{user.name}</td>
              <td className="border px-2 py-1">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listagem;

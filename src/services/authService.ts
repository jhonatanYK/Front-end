import axios from "axios";

// URL base da API do backend
const API_URL = "http://localhost:3000/api";

// Função para fazer login
export const login = async (email: string, password: string) => {
  try {
    // Envia uma requisição POST para o endpoint /login com email e senha
    const response = await axios.post<{ token: string }>(`${API_URL}/login`, { email, password });
    const { token } = response.data; // Extrai o token da resposta
    localStorage.setItem("token", token); // Salva o token no localStorage
    return token; // Retorna o token
  } catch (error) {
    // Se der erro, exibe no console e repassa o erro para ser tratado no componente
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

// Função para registrar um novo usuário
export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    throw error;
  }
};

// Função para fazer logout (remove o token do localStorage)
export const logout = () => {
  localStorage.removeItem("token");
};

// Função para obter o token salvo no localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Função para buscar todos os usuários (rota protegida)
export const getUsers = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};
import { app, BrowserWindow } from "electron"; // Importa módulos do Electron
import path from "path"; // Importa o módulo path para manipular caminhos de arquivos

// Função responsável por criar a janela principal da aplicação
function createWindow() {
  // Cria uma nova janela do navegador com as configurações especificadas
  const win = new BrowserWindow({
    width: 800, // Largura da janela
    height: 600, // Altura da janela
    webPreferences: {
      nodeIntegration: true, // Permite o uso de Node.js no frontend (atenção à segurança)
    },
  });

  // Se estiver em ambiente de desenvolvimento, carrega o frontend pelo servidor local
  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:3000");
  } else {
    // Se estiver em produção, carrega o arquivo HTML gerado pelo build do React
    win.loadURL(`file://${path.join(__dirname, "index.html")}`);
  }
}

// Quando o Electron estiver pronto, chama a função para criar a janela
app.on("ready", createWindow);
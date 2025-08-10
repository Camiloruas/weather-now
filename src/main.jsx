// Importa o React e a função para renderizar a aplicação.
import React from "react";
import ReactDOM from "react-dom/client";

// Importa o componente principal da sua aplicação.
import App from "./App.jsx";

// Cria um "root" para o React renderizar o app na página
// e renderiza o componente App dentro dele.
// A vírgula no final da linha 13 foi removida.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

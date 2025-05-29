# 🌦️ Weather Now

Um aplicativo web simples e funcional para verificar o clima em qualquer cidade do mundo. Desenvolvido como um projeto de aprendizado para praticar o consumo de APIs externas e a criação de aplicações web dinâmicas com Node.js.

🔗 [Acesse o aplicativo](https://thawing-basin-71658-407b69e3d106.herokuapp.com/weather)

## 📸 Visão Geral

No **Weather Now**, você pode digitar o nome de uma cidade e receber:

- 🌡️ Temperatura atual  
- 🌤️ Descrição do clima (ex: céu limpo, nublado, chuvoso)  
- 🖼️ Fundo da página que muda dinamicamente conforme o clima

Tudo isso em uma interface simples e intuitiva.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** – ambiente de execução JavaScript no back-end  
- **Express.js** – framework leve para criação do servidor  
- **EJS** – templates para renderização dinâmica do HTML  
- **Axios** – cliente HTTP para chamadas à API do clima  
- **dotenv** – gerenciador de variáveis de ambiente  
- **OpenWeather API** – dados meteorológicos em tempo real

---

## ✨ Funcionalidades

- ✅ Busca por cidade
- ✅ Exibição de temperatura e descrição do clima
- ✅ Imagens de fundo que refletem o clima atual
- ✅ Tratamento de erros para cidades não encontradas

---

## 🚀 Como Rodar Localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/Camiloruas/weather-now.git
   cd weather-now
Instale as dependências

bash
Copiar
Editar
npm install
Crie um arquivo .env com sua chave da OpenWeather API

env
Copiar
Editar
OPENWEATHER_API_KEY=SUA_CHAVE_AQUI
Inicie o servidor

bash
Copiar
Editar
npm start
Acesse em seu navegador

bash
Copiar
Editar
http://localhost:3000/weather
📚 Aprendizados
Este projeto me proporcionou a prática de:

Consumo de APIs REST com axios

Uso de async/await e tratamento de erros assíncronos

Renderização de páginas com EJS no back-end

Manipulação de dados JSON

Boas práticas com variáveis de ambiente

Estilização dinâmica com base em dados recebidos

📌 Status do Projeto
✅ Finalizado — projeto concluído como parte do processo de aprendizado. Futuras melhorias poderão ser aplicadas conforme o progresso nos estudos.

🤝 Contribuindo
Este é um projeto pessoal de aprendizado. Se você tiver sugestões ou encontrar algum erro, sinta-se à vontade para abrir uma issue!

👤 Autor
Camilo Ruas
🔗 GitHub: @Camiloruas
🔗 LinkedIn
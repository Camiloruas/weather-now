## 🌦️ Weather Now

Um aplicativo web simples e funcional para verificar o clima em qualquer cidade do mundo. Desenvolvido como um projeto de aprendizado para praticar o consumo de APIs externas e a criação de aplicações web dinâmicas com Node.js.

🔗 [Acesse o aplicativo](https://thawing-basin-71658-407b69e3d106.herokuapp.com)

## 📸 Visão Geral

No **Weather Now**, você pode digitar o nome de uma cidade e receber:

- 🌡️ Temperatura atual  
- 🌤️ Descrição do clima (ex: céu limpo, nublado, chuvoso)  
- 🖼️ Fundo da página que muda dinamicamente conforme o clima

Tudo isso em uma interface simples e intuitiva.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** – ambiente de execução JavaScript no back-end  
- **Express** – framework leve para criação do servidor  
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
   cd weather-now
   git clone https://github.com/Camiloruas/weather-now.git
   ```



2. **Instale as dependências**
   ```bash
   npm install express ejs axios dotenv
   ```


3. **Crie um arquivo `.env` com sua chave da OpenWeather API**
   ```bash
    OPENWEATHER_API_KEY=SUA_CHAVE_AQUI
    ```

4. **Inicie o servidor**

   ```bash
   npm start
   ```

5. **Acesse em seu navegador**

   ```bash
   http://localhost:3000/weather
   ```

---

## 📚 Aprendizados

Este projeto me proporcionou a prática de:

- Consumo de APIs REST com `axios`
- Uso de `async/await` e tratamento de erros assíncronos
- Renderização de páginas com EJS no back-end
- Manipulação de dados JSON
- Boas práticas com variáveis de ambiente
- Estilização dinâmica com base em dados recebidos

---

## 📌 Status do Projeto

✅ Finalizado — projeto concluído como parte do processo de aprendizado. Futuras melhorias poderão ser aplicadas conforme o progresso nos estudos.

---

## 🤝 Contribuindo

Este é um projeto pessoal de aprendizado, mas sugestões são sempre bem-vindas!
Se você tiver alguma ideia de melhoria, identificar um erro ou quiser dar um feedback, sinta-se à vontade para registrar um comentário na aba Issues do repositório.

---

## 👤 Autor

**Camilo Ruas**  
🔗 [GitHub: @Camiloruas](https://github.com/Camiloruas)  
🔗 [LinkedIn](https://www.linkedin.com/in/camilo-ruas-3a2a6425/)
# Weather Now

Um aplicativo web para verificar o clima em qualquer cidade do mundo. Este projeto foi desenvolvido com React e Vite, focando na criação de uma interface de usuário moderna e no consumo de APIs externas no client-side.

[Acesse o aplicativo](https://weather-now-ashy.vercel.app/)

## Visão Geral

No Weather Now, você pode digitar o nome de uma cidade para obter a temperatura atual, descrição do clima, sensação térmica, umidade e outras informações meteorológicas. A interface é simples, reativa e estilizada com Tailwind CSS.

## Tecnologias Utilizadas

- **Front-end:** React, Vite, Tailwind CSS
- **APIs:** OpenWeather API para dados meteorológicos
- **Linguagem:** JavaScript (ES6+)
- **Ferramentas:** Fetch API para requisições HTTP

## Funcionalidades

- Busca de clima por cidade.
- Exibição da temperatura, descrição do tempo, sensação térmica, umidade, etc.
- Ícones dinâmicos que refletem as condições climáticas.
- Tratamento de erros para cidades não encontradas ou falhas na API.

## Como Rodar Localmente

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Camiloruas/weather-now.git
    cd weather-now
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure suas variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API OpenWeather. O Vite exige que as variáveis de ambiente expostas ao cliente comecem com o prefixo `VITE_`.

    ```
    VITE_OPENWEATHER_API_KEY=SUA_CHAVE_AQUI
    ```

4.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse o endereço fornecido pelo Vite (geralmente `http://localhost:5173`).

## Aprendizados

Este projeto focou na prática de:

- Criação de componentes funcionais com React.
- Gerenciamento de estado com os hooks `useState` e `useEffect`.
- Consumo de APIs no client-side usando a Fetch API.
- Programação assíncrona com `async/await`.
- Estilização moderna e responsiva com Tailwind CSS.
- Configuração e uso de variáveis de ambiente em um projeto Vite.

## Status do Projeto

Projeto finalizado para fins de aprendizado.

## Contato

**Camilo Ruas**

- [GitHub](https://github.com/Camiloruas)
- [LinkedIn](https://www.linkedin.com/in/camilo-ruas-3a2a6425/)

# Weather Now

Um aplicativo web para verificar o clima em qualquer cidade do mundo. Este projeto foi desenvolvido para praticar o consumo de APIs externas e a criação de aplicações web dinâmicas com Node.js.

[Acesse o aplicativo](https://weather-now-ashy.vercel.app/)

## Visão Geral

No Weather Now, você pode digitar o nome de uma cidade para obter a temperatura atual e uma descrição do clima. A interface é simples e o fundo da página se adapta dinamicamente às condições climáticas.

## Tecnologias Utilizadas

- **Back-end:** Node.js, Express
- **Front-end:** EJS para renderização dinâmica
- **APIs:** OpenWeather API para dados meteorológicos
- **Outras ferramentas:** Axios, dotenv

## Funcionalidades

- Busca de clima por cidade.
- Exibição da temperatura e descrição do tempo.
- Fundo da página dinâmico que reflete o clima.
- Tratamento de erros para cidades não encontradas.

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
    Crie um arquivo `.env` na raiz do projeto e adicione sua chave da API OpenWeather:

    ```
    OPENWEATHER_API_KEY=SUA_CHAVE_AQUI
    ```

4.  **Inicie o servidor:**

    ```bash
    npm start
    ```

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:3000/weather`.

## Aprendizados

Este projeto focou na prática de:

- Consumo de APIs REST com `axios`.
- Programação assíncrona com `async/await`.
- Renderização de views no lado do servidor com EJS.
- Gerenciamento de chaves de API com variáveis de ambiente.

## Status do Projeto

Projeto finalizado para fins de aprendizado.

## Contato

**Camilo Ruas**

- [GitHub](https://github.com/Camiloruas)
- [LinkedIn](https://www.linkedin.com/in/camilo-ruas-3a2a6425/)

// Importa a biblioteca dotenv para carregar variáveis de ambiente de um arquivo .env
import dotenv from "dotenv";
// Carrega as variáveis de ambiente do arquivo .env para process.env
dotenv.config(); 
// Importa o framework Express para criar o servidor web
import express from "express";
// Importa a biblioteca Axios para fazer requisições HTTP para a API do OpenWeatherMap
import axios from "axios";
// Importa o body-parser para analisar o corpo das requisições HTTP
import bodyParser from "body-parser";


// Cria uma instância do aplicativo Express
const app = express();
// Define a porta em que o servidor irá rodar localmente
const port = 3000;
// Define a URL base da API do OpenWeatherMap
const ulr = "https://api.openweathermap.org/data/2.5/weather";
// Pega a chave da API do OpenWeatherMap das variáveis de ambiente
const myToken  = process.env.OPENWEATHER_API_KEY;

// Middleware para analisar corpos de requisição no formato x-www-form-urlencoded (dados de formulário)
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware para servir arquivos estáticos (CSS, imagens, etc.) da pasta 'public'
app.use(express.static('public'));


// Rota principal (GET /) que renderiza a página inicial
app.get("/", (req, res)=> {
    // Renderiza o template EJS 'index.ejs'
    res.render("index.ejs" )
} )


// Rota para buscar o clima (POST /weather) que é acionada quando o usuário envia o formulário
app.post("/weather", async(req, res)=> {
    // Pega o nome da cidade do corpo da requisição (do formulário)
    const nomeCidade =  req.body.city;
    // Monta a URL da API de geolocalização para obter as coordenadas da cidade
    const geolocalizacaoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${nomeCidade}&limit=1&appid=${myToken}`;
    
    try {
        // Faz uma requisição GET para a API de geolocalização
        const geoResposta = await axios.get(geolocalizacaoApiUrl);
        // Pega os dados da primeira cidade encontrada na resposta
        const dadosCidade = geoResposta.data[0];
        
        // Verifica se a cidade foi encontrada
        if(dadosCidade){
            // Pega a latitude e longitude da cidade
            const latitude = dadosCidade.lat;
            const longitude = dadosCidade.lon;
            // Monta a URL da API do tempo usando as coordenadas
            const urlApiTempo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myToken}&lang=pt_br`;
            // Faz uma requisição GET para a API do tempo
            const respostaTempo = await axios.get(urlApiTempo);
            // Pega os dados do tempo da resposta
            const dadosTempo = respostaTempo.data;
            // Inicializa a variável que vai guardar a classe CSS para o fundo
            let weatherClass = '';
            // Pega a descrição do tempo e converte para minúsculas para facilitar a comparação
            const description = dadosTempo.weather[0].description.toLowerCase();
            // Pega o timestamp atual, do nascer e do pôr do sol da resposta da API
            const currentTime = dadosTempo.dt;
            const sunrise = dadosTempo.sys.sunrise;
            const sunset = dadosTempo.sys.sunset;
            // Verifica se é dia (o tempo atual está entre o nascer e o pôr do sol)
            const isDay = currentTime > sunrise && currentTime < sunset;

            // Lógica para definir a classe CSS com base na descrição do tempo e se é dia ou noite
            if (description.includes('chuva')) {
                weatherClass = 'rainy'; // Se chovendo, a classe é sempre 'rainy'
            } else if (description.includes('sol') || description.includes('limpo')) {
                // Se o tempo está limpo, verifica se é dia ou noite para definir a classe
                weatherClass = isDay ? 'sunny' : 'clear-night';
            } else if (description.includes('nuvens') || description.includes('nublado')) {
                // Se está nublado, verifica se é dia ou noite
                weatherClass = isDay ? 'cloudy' : 'cloudy-night';
            } else if (description.includes('névoa')) {
                // Se tem névoa, verifica se é dia ou noite
                weatherClass = isDay ? 'mist' : 'mist-night';
            }

            // Renderiza o template 'index.ejs' passando os dados do tempo e a classe CSS
            res.render("index.ejs", { dadosTempo: dadosTempo , errorMessage: null, weatherClass: weatherClass });

            } else{
                // Se a cidade não for encontrada, renderiza a página com uma mensagem de erro
                res.render("index.ejs", { dadosTempo: null , errorMessage:"Cidade não encontrada "});
            }

    } catch(error) {
        // Se ocorrer um erro na requisição, loga o erro no console
        console.error (error);
        // E renderiza a página com uma mensagem de erro genérica
        res.render("index.ejs", { dadosTempo: null, errorMessage: "Erro ao Buscar a cidade "})
    }
})


// Define a porta para o Heroku (usando a variável de ambiente PORT) ou a porta 3000 localmente
const herokuPort = process.env.PORT || 3000;
// Inicia o servidor na porta definida
app.listen(herokuPort, ()=>{
    console.log(" O Servidor rodando na porta " + herokuPort)
})


// app.listen(port, ()=>{
//     console.log("Servidor rodando na porta " + port)
// })
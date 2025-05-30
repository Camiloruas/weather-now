import dotenv from "dotenv";
dotenv.config(); // carrega as variáveis do .env
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const ulr = "https://api.openweathermap.org/data/2.5/weather";
const myToken  = process.env.OPENWEATHER_API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get("/", (req, res)=> {
    res.render("index.ejs" )
} )


app.post("/weather", async(req, res)=> {
    const nomeCidade =  req.body.city;
    const geolocalizacaoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${nomeCidade}&limit=1&appid=${myToken}`;
    try {
        const geoResposta = await axios.get(geolocalizacaoApiUrl);
        const dadosCidade = geoResposta.data[0];
        
        if(dadosCidade){
            const latitude = dadosCidade.lat;
            const longitude = dadosCidade.lon;
            const urlApiTempo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myToken}&lang=pt_br`;
            const respostaTempo = await axios.get(urlApiTempo);
            const dadosTempo = respostaTempo.data;
            let weatherClass = '';
            const description = dadosTempo.weather[0].description.toLowerCase();

            if (description.includes('chuva')) {
                weatherClass = 'rainy';
            } else if (description.includes('sol') || description.includes('limpo')) {
                weatherClass = 'sunny';
            } else if (description.includes('nuvens') || description.includes('nublado')) {
                weatherClass = 'cloudy';
            } else if (description.includes('névoa') || description.includes('nublado')) {
                weatherClass = 'mist';
            }

            res.render("index.ejs", { dadosTempo: dadosTempo , errorMessage: null, weatherClass: weatherClass });

            } else{
                res.render("index.ejs", { dadosTempo: null , errorMessage:"Cidade não encontrada "});
            }

    } catch(error) {
        console.error (error);
        res.render("index.ejs", { dadosTempo: null, errorMessage: "Erro ao Buscar a cidade "})
    }
})


const herokuPort = process.env.PORT || 3000;
app.listen(herokuPort, ()=>{
    console.log(" O Servidor rodando na porta " + herokuPort)
})


// app.listen(port, ()=>{
//     console.log("Servidor rodando na porta " + port)
// })
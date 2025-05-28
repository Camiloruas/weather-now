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
            const urlApiTempo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myToken}`;
            const respostaTempo = await axios.get(urlApiTempo);
            const dadosTempo = respostaTempo.data;
            res.render("index.ejs", { dadosTempo: dadosTempo , errorMessage: null});
            
            } else{
                res.render("index.ejs", { dadosTempo: null , errorMessage:"Cidade não encontrada "});
            }

    } catch(error) {
        console.error (error);
        res.render("index.ejs", { dadosTempo: null, errorMessage: "Erro ao Buscar a cidade "})
    }
})


app.listen(port, ()=>{
    console.log("Servidor rodando na porta " + port)
})
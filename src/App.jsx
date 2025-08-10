import React, { useState, useEffect } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Novo estado para armazenar a abreviação do estado da cidade
  const [cityState, setCityState] = useState("");

  // Acessa a variável de ambiente com o prefixo VITE_
  // Nota: A chave da API deve ser definida em um arquivo .env como VITE_OPENWEATHER_API_KEY
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeather = async () => {
    if (!city) {
      setError("Por favor, digite o nome de uma cidade.");
      setWeatherData(null);
      setCityState("");
      return;
    }

    // Exibe o estado de carregamento e limpa mensagens anteriores
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setCityState("");

    try {
      // 1. Usa a API de geocodificação para obter as coordenadas da cidade
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        throw new Error(
          "Cidade não encontrada. Verifique o nome e tente novamente."
        );
      }

      const { lat, lon, state } = geoData[0];
      // Salva o estado da cidade se ele existir na resposta da API
      if (state) {
        setCityState(state);
      }

      // 2. Usa as coordenadas para obter os dados do clima atual
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      const data = await weatherResponse.json();

      if (data.cod === "401" || data.cod === "404") {
        throw new Error(
          "Erro na API: Chave de API inválida ou cidade não encontrada."
        );
      }

      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao buscar o clima:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  const getWeatherIcon = (iconCode) => {
    // Mapeia os códigos de ícones da API OpenWeather para ícones SVG
    switch (iconCode) {
      case "01d":
        return "sun";
      case "01n":
        return "moon";
      case "02d":
        return "cloud-sun";
      case "02n":
        return "cloud-moon";
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return "cloud";
      case "09d":
      case "09n":
        return "cloud-rain";
      case "10d":
        return "cloud-drizzle";
      case "10n":
        return "cloud-drizzle";
      case "11d":
      case "11n":
        return "cloud-lightning";
      case "13d":
      case "13n":
        return "cloud-snow";
      case "50d":
      case "50n":
        return "mist";
      default:
        return "thermometer";
    }
  };

  const getWeatherDescription = (weather) => {
    if (weather) {
      const description = weather.description;
      return description.charAt(0).toUpperCase() + description.slice(1);
    }
    return "";
  };

  // Componente de ícone para renderizar SVGs inline
  const Icon = ({
    name,
    size = 24,
    color = "currentColor",
    className = "",
  }) => {
    const iconMap = {
      sun: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><circle cx="12" cy="12" r="5"/><line x1="12" x2="12" y1="1" y2="3"/><line x1="12" x2="12" y1="21" y2="23"/><line x1="4.22" x2="5.64" y1="4.22" y2="5.64"/><line x1="18.36" x2="19.78" y1="18.36" y2="19.78"/><line x1="1" x2="3" y1="12" y2="12"/><line x1="21" x2="23" y1="12" y2="12"/><line x1="4.22" x2="5.64" y1="19.78" y2="18.36"/><line x1="18.36" x2="19.78" y1="5.64" y2="4.22"/></svg>`,
      moon: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
      cloud: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
      "cloud-sun": `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/><path d="M16 12a4 4 0 0 1-4 4H8a5 5 0 1 1 4.9-6H16a3 3 0 0 1 0 6Z"/></svg>`,
      "cloud-moon": `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M13 12a4 4 0 0 1 4 4"/><path d="M8 8.64a5 5 0 1 1 8 4.3"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/><path d="M12 4a8 8 0 0 0 6.64 12.8A7.95 7.95 0 0 1 12 16a8 8 0 0 1-8-8c0-3.3 1.47-6.23 3.8-8.15a9 9 0 0 0 8.2 8.15Z"/></svg>`,
      "cloud-rain": `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M4 14.5a5 5 0 0 1 10-1c.01-.2.03-.4.07-.6A5 5 0 0 1 20 8a5 5 0 0 1-4.75 6.5H16a5 5 0 0 1-10 1Z"/><path d="M16 21v-2"/><path d="M8 21v-2"/><path d="M12 21v-2"/></svg>`,
      "cloud-drizzle": `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M4 14.5a5 5 0 0 1 10-1c.01-.2.03-.4.07-.6A5 5 0 0 1 20 8a5 5 0 0 1-4.75 6.5H16a5 5 0 0 1-10 1Z"/><path d="M8 19v1"/><path d="M8 17v1"/><path d="M16 19v1"/><path d="M16 17v1"/><path d="M12 17v1"/></svg>`,
      "cloud-lightning": `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M19 16.5A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>`,
      "cloud-snow": `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M4 14.5a5 5 0 0 1 10-1c.01-.2.03-.4.07-.6A5 5 0 0 1 20 8a5 5 0 0 1-4.75 6.5H16a5 5 0 0 1-10 1Z"/><path d="M8 19h.01"/><path d="M8 21h.01"/><path d="M12 19h.01"/><path d="M12 21h.01"/><path d="M16 19h.01"/><path d="M16 21h.01"/></svg>`,
      mist: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M8 16h8"/><path d="M10 20h4"/><path d="M9 12h6"/><path d="M21 15a5 5 0 0 0-5-5H9a7 7 0 1 0 0 14h6.34a5 5 0 0 0 4.7-6.3Z"/></svg>`,
      thermometer: `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>`,
    };
    return <div dangerouslySetInnerHTML={{ __html: iconMap[name] || "" }} />;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Clima Agora
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite o nome da cidade..."
            className="flex-grow p-3 rounded-xl bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          />
          <button
            onClick={fetchWeather}
            className="p-3 bg-teal-500 hover:bg-teal-600 rounded-xl font-semibold transition-colors duration-300"
          >
            Buscar
          </button>
        </div>

        {loading && (
          <div className="text-center text-teal-400">
            <p>Carregando...</p>
          </div>
        )}

        {error && (
          <div className="text-center bg-red-800 bg-opacity-50 p-4 rounded-xl">
            <p className="text-red-300 font-semibold">{error}</p>
          </div>
        )}

        {weatherData && (
          <div className="mt-8 text-center text-gray-200">
            <div className="flex flex-col items-center">
              <Icon
                name={getWeatherIcon(weatherData.weather[0].icon)}
                size={96}
                color="#6EE7B7"
              />
              <h2 className="text-5xl font-extrabold mt-4">
                {Math.round(weatherData.main.temp)}°C
              </h2>
              <p className="text-lg font-medium mt-2">
                {getWeatherDescription(weatherData.weather[0])}
              </p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mt-4">
                {/* A partir daqui, verifica se cityState existe e o adiciona à string */}
                {weatherData.name}
                {cityState ? `, ${cityState}` : ""}, {weatherData.sys.country}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
              <div className="p-4 bg-gray-700 rounded-xl flex items-center justify-between">
                <p className="text-gray-400">Sensação Térmica</p>
                <span className="font-semibold text-lg">
                  {Math.round(weatherData.main.feels_like)}°C
                </span>
              </div>
              <div className="p-4 bg-gray-700 rounded-xl flex items-center justify-between">
                <p className="text-gray-400">Umidade</p>
                <span className="font-semibold text-lg">
                  {weatherData.main.humidity}%
                </span>
              </div>
              <div className="p-4 bg-gray-700 rounded-xl flex items-center justify-between">
                <p className="text-gray-400">Velocidade do Vento</p>
                <span className="font-semibold text-lg">
                  {weatherData.wind.speed} m/s
                </span>
              </div>
              <div className="p-4 bg-gray-700 rounded-xl flex items-center justify-between">
                <p className="text-gray-400">Pressão</p>
                <span className="font-semibold text-lg">
                  {weatherData.main.pressure} hPa
                </span>
              </div>
            </div>
          </div>
        )}

        {!apiKey && (
          <div className="text-center p-4 bg-red-800 bg-opacity-50 rounded-xl mt-4">
            <p className="text-red-300 font-semibold">
              Chave da API não encontrada. Por favor, adicione
              VITE_OPENWEATHER_API_KEY no seu arquivo .env
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

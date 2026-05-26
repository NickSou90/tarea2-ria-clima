// Importamos axios, una librería para hacer peticiones HTTP de forma sencilla
import axios from 'axios';

// Leemos la API Key desde las variables de entorno de Vite (archivo .env → VITE_WEATHER_API_KEY)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

// URL base de la API de OpenWeatherMap v2.5; todos los endpoints parten de aquí
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// ─── Clima actual ────────────────────────────────────────────────────────────
// Función asíncrona que obtiene el clima actual para una ciudad
// Parámetros: q=city (ciudad), units=metric (°C), lang=es (descripciones en español)
export const getCurrentWeather = async (city) => {
    try {
        // GET al endpoint /weather con la ciudad y la API key como parámetros de la URL
        const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
        return response.data; // Devolvemos solo el cuerpo de la respuesta (objeto con los datos del clima)
    } catch (error) {
        console.error("Error al buscar el clima:", error); // Loguea el error para facilitar el debugging
        throw error; // Re-lanza el error para que el componente llamador pueda mostrarlo al usuario
    }
};

// ─── Pronóstico de 5 días ────────────────────────────────────────────────────
// Función asíncrona que obtiene el pronóstico en bloques de 3 horas para los próximos 5 días
// La API devuelve hasta 40 registros (8 registros/día × 5 días)
export const getForecast = async (city) => {
    try {
        // GET al endpoint /forecast con los mismos parámetros de ciudad, unidades e idioma
        const response = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`);
        return response.data; // Devolvemos el objeto con `list` (pronósticos) y `city` (info de la ciudad)
    } catch (error) {
        console.error("Error al buscar el pronóstico:", error); // Loguea el error para debugging
        throw error; // Re-lanza el error para que el componente pueda reaccionar apropiadamente
    }
};
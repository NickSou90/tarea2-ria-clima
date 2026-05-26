# 🌤️ Clima en Tiempo Real

Aplicación web que permite consultar el **clima actual** y el **pronóstico extendido de 5 días** para cualquier ciudad del mundo, construida con React + Vite y la API de OpenWeatherMap.

---

## 📸 Características

- 🔍 **Búsqueda por ciudad** con persistencia en `localStorage` (recuerda la última ciudad buscada)
- 🌡️ **Clima actual**: temperatura, sensación térmica, humedad, viento, visibilidad, temperatura máx/mín
- 📅 **Pronóstico de 5 días**: tarjetas diarias con temperatura, descripción, humedad, viento y sensación térmica
- 🎨 **Diseño dark mode** con glassmorphism, gradientes y animaciones suaves (Fade, pulse)
- 🏙️ **Ciudades sugeridas** como accesos rápidos cuando no hay búsqueda activa
- 🐳 **Dockerizado** con build multi-etapa (Node → Nginx Alpine)
- ✅ **Tests unitarios** con Vitest + Testing Library

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | Framework de UI |
| Vite | 8 | Bundler y dev server |
| React Router DOM | 7 | Enrutamiento SPA |
| Material UI (MUI) | 9 | Componentes y sistema de diseño |
| Axios | 1.x | Cliente HTTP |
| Vitest | 4 | Test runner |
| Testing Library | 16 | Utilidades de pruebas para React |
| Docker + Nginx | - | Containerización y servidor de producción |
| pnpm | - | Gestor de paquetes |

---

## 📁 Estructura del Proyecto

```
clima-tiempo-real/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx       # Input de búsqueda + botón
│   │   └── WeatherCard.jsx     # Tarjeta de clima actual
│   ├── views/
│   │   ├── Home.jsx            # Página principal
│   │   └── ForecastDetails.jsx # Página de pronóstico extendido
│   ├── router/
│   │   └── AppRouter.jsx       # Configuración de rutas
│   ├── services/
│   │   └── weatherService.js   # Integración con OpenWeatherMap API
│   ├── utils/
│   │   └── theme.js            # Tema personalizado de Material UI
│   ├── tests/
│   │   ├── SearchBar.test.jsx
│   │   ├── WeatherCard.test.jsx
│   │   └── setup.js
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile
├── docker-compose.yml
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🚀 Inicio Rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) v20+
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- Clave de API de [OpenWeatherMap](https://openweathermap.org/api) (gratuita)

### 1. Clonar el repositorio

```bash
git clone https://github.com/NickSou90/tarea2-ria-clima.git
cd tarea2-ria-clima
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_WEATHER_API_KEY=tu_api_key_aquí
```

> Obtén tu API key gratuita en [openweathermap.org/api](https://openweathermap.org/api).

### 3. Instalar dependencias

```bash
pnpm install
```

### 4. Iniciar el servidor de desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`.

---

## 🐳 Ejecución con Docker

### Opción A — Docker Compose (recomendado)

```bash
docker compose up --build
```

La app quedará disponible en `http://localhost:8081`.

### Opción B — Docker manual

```bash
# Build de la imagen
docker build -t clima-app .

# Ejecutar el contenedor
docker run -p 8081:80 --env-file .env clima-app
```

> El Dockerfile usa una **build multi-etapa**: primero compila la app con Node.js 20 Alpine y luego sirve los archivos estáticos con Nginx Alpine, resultando en una imagen final muy liviana.

---

## 🧪 Tests

```bash
# Ejecutar tests una vez
pnpm test

# Modo watch (re-ejecuta al guardar cambios)
pnpm test --watch
```

Los tests se encuentran en `src/tests/` y validan los componentes `SearchBar` y `WeatherCard` usando **Vitest** + **Testing Library**.

---

## 🌐 Rutas de la Aplicación

| Ruta | Vista | Descripción |
|---|---|---|
| `/` | `Home` | Búsqueda y clima actual de la ciudad |
| `/forecast` | `ForecastDetails` | Pronóstico de 5 días de la última ciudad buscada |

---

## 🌡️ API de OpenWeatherMap

El proyecto consume dos endpoints de la API v2.5:

| Endpoint | Uso |
|---|---|
| `/data/2.5/weather` | Clima actual (temperatura, humedad, viento, visibilidad) |
| `/data/2.5/forecast` | Pronóstico en bloques de 3 horas (filtrado a mediodía de cada día) |

Todos los datos se solicitan en **unidades métricas (°C)** y con **descripciones en español** (`lang=es`).

---

## 📜 Scripts Disponibles

```bash
pnpm dev        # Inicia el servidor de desarrollo con HMR
pnpm build      # Genera el bundle de producción en /dist
pnpm preview    # Sirve el bundle de producción localmente
pnpm lint       # Ejecuta ESLint sobre todo el proyecto
pnpm test       # Corre los tests con Vitest
```

---

## 📄 Licencia

Este proyecto fue desarrollado como **Tarea 2** del curso de Redes e Interfaces Avanzadas (RIA).

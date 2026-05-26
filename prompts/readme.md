# Prompt — Generación del README

## Conversación

**Fecha:** 2026-05-26  
**Objetivo:** Crear el archivo `README.md` completo y profesional para el proyecto.

---

## Prompt utilizado

> Quiero que me hagas el README de este proyecto

---

## Contexto del proyecto al momento del prompt

- El proyecto acababa de recibir su **primer commit** con la configuración inicial:
  - React 19 + Vite 8
  - React Router DOM v7
  - Material UI (MUI) v9
  - Axios para peticiones HTTP
  - Vitest + Testing Library para tests
  - Dockerfile multi-etapa (Node → Nginx Alpine)
  - Docker Compose con mapeo de puerto `8081:80`
- El `README.md` existente era el **template por defecto de Vite**, sin información del proyecto.
- La aplicación ya contaba con dos vistas (`Home`, `ForecastDetails`), dos componentes (`SearchBar`, `WeatherCard`), un servicio (`weatherService.js`) y un router (`AppRouter.jsx`).

---

## Archivos analizados para generar el README

| Archivo | Información extraída |
|---|---|
| `package.json` | Dependencias, versiones, scripts disponibles |
| `src/services/weatherService.js` | Endpoints de OpenWeatherMap usados (`/weather`, `/forecast`) |
| `src/views/Home.jsx` | Funcionalidades: búsqueda, localStorage, ciudades sugeridas, estado de carga/error |
| `src/views/ForecastDetails.jsx` | Pronóstico de 5 días, skeletons, color por temperatura |
| `src/components/SearchBar.jsx` | Input controlado, callback `onSearch`, íconos MUI |
| `src/components/WeatherCard.jsx` | Datos mostrados: temp, humedad, viento, visibilidad, sensación térmica |
| `src/router/AppRouter.jsx` | Rutas `/` y `/forecast` |
| `Dockerfile` | Build multi-etapa Node 20 Alpine → Nginx Alpine |
| `docker-compose.yml` | Puerto `8081:80`, `env_file`, `restart: unless-stopped` |

---

## Resultado generado

Se reemplazó el `README.md` con uno completo que incluye:

1. **Descripción general** con características clave
2. **Tabla del stack tecnológico** con versiones y roles
3. **Árbol de estructura del proyecto** con descripción de cada archivo
4. **Guía de inicio rápido** (clonar → `.env` → instalar → `pnpm dev`)
5. **Ejecución con Docker** (opción Compose y opción manual)
6. **Sección de tests** (`pnpm test`, modo watch)
7. **Tabla de rutas** de la SPA
8. **Endpoints de la API** de OpenWeatherMap
9. **Tabla de scripts** disponibles con `pnpm`
10. **Nota de licencia** como proyecto académico (Tarea 2 - RIA)

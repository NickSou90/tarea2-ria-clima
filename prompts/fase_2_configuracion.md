# Prompt — Fase 2: Configuración del Repositorio y Arquitectura

## Conversación

**Fecha:** 2026-05-25  
**Objetivo:** Detallar los pasos para la creación del proyecto base, configuración de la estructura de carpetas, instalación de librerías esenciales (React Router y Material UI) y configuración del repositorio en GitHub.

---

## Prompt utilizado

> Empecemos la Fase 2. Quiero un detalle de cada paso

---

## Contexto del proyecto al momento del prompt

- El proyecto se encontraba en la transición de la **Fase 1: Diseño y Planificación (Mockups)** a la fase de implementación.
- No existía estructura de carpetas ni dependencias instaladas en el entorno local.
- Se requería definir un flujo claro para configurar la arquitectura modular del frontend y asegurar la entrega en un repositorio público en GitHub (criterio obligatorio de evaluación de 10 puntos).

---

## Pasos detallados para configurar la Fase 2

| Paso | Descripción / Comando |
|---|---|
| **1. Crear proyecto base (Vite)** | `npm create vite@latest clima-tiempo-real -- --template react` |
| **2. Instalar dependencias** | Instalar `react-router-dom` para rutas y `@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material` para Material Design. |
| **3. Limpiar y estructurar** | Borrar `App.css` e `index.css`. Crear carpetas `src/components/`, `src/views/`, `src/services/` y `src/utils/`. |
| **4. Crear esqueletos base** | Generar `Home.jsx`, `ForecastDetails.jsx`, `SearchBar.jsx`, `WeatherCard.jsx` y limpiar `App.jsx`. |
| **5. Configurar Git y GitHub** | Inicializar repositorio local, vincular al repositorio público en GitHub (`tarea2-ria-clima`) y realizar el primer push. |
| **6. Comprobar funcionamiento** | Levantar el servidor de desarrollo local con `npm run dev` y comprobar en `http://localhost:5173`. |

---

## Resultado generado

Se establecieron los cimientos del proyecto frontend:
1. **Proyecto base configurado** con Vite, corriendo correctamente en el entorno de desarrollo.
2. **Estructura de carpetas limpia** y alineada con los patrones arquitectónicos modularizados del diagrama de componentes.
3. **Librerías principales instaladas y configuradas**, garantizando el cumplimiento de los requerimientos de Material Design y enrutamiento de la SPA.
4. **Repositorio público en GitHub inicializado**, asegurando los 10 puntos de la rúbrica sobre calidad de código y control de versiones.

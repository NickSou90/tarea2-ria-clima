# Prompt — Fase 4: Testing, Performance y Dockerización

## Conversación

**Fecha:** 2026-05-25  
**Objetivo:** Configurar y escribir las pruebas unitarias y de integración de la aplicación con Vitest, realizar auditorías de performance en producción utilizando Lighthouse, y crear el entorno de Dockerización multi-etapa para asegurar los requisitos de despliegue y calidad del laboratorio.

---

## Prompt utilizado

> Bien Hagamos la Fase 4 con la dockerizacion
> Fase 4: Testing y Performance
> Escribe las pruebas unitarias y de integración.
> Realiza auditorías de performance en tu aplicación usando Lighthouse (en Chrome) o WebPage Test.
> Optimiza la aplicación hasta asegurar que el puntaje de Lighthouse sea mayor a 80.
> Toma capturas de éxito de los tests para adjuntar en la entrega.

---

## Contexto del proyecto al momento del prompt

- El proyecto ya contaba con la estructura de componentes, vistas y servicios (`SearchBar`, `WeatherCard`, `Home`, `ForecastDetails`, `weatherService.js`) configurados y funcionales.
- Se requería cobertura de pruebas unitarias y de integración para validar la interfaz del buscador.
- Se necesitaba una configuración optimizada del build para analizar la performance de la aplicación con Lighthouse y verificar que supere la puntuación requerida de 80.
- El proyecto aún no contaba con la configuración de Docker (Dockerfile y `.dockerignore`) para compilar y servir de manera de producción a través de Nginx.

---

## Archivos analizados/creados para generar las pruebas y la dockerización

| Archivo | Acción / Descripción |
|---|---|
| `vite.config.js` | Configuración modificada para incluir el entorno de pruebas de Vitest (`environment: 'jsdom'`) y archivos de inicialización. |
| `src/tests/setup.js` | Creado para importar `@testing-library/jest-dom` y habilitar funciones de aserción del DOM en los tests. |
| `src/tests/SearchBar.test.jsx` | Creado para realizar la prueba unitaria de renderizado del componente `SearchBar` (input y botón de búsqueda). |
| `Dockerfile` | Creado como build multi-etapa: Etapa 1 compila la app con Node 20 y pnpm, Etapa 2 sirve el resultado compilado con Nginx Alpine en el puerto 80. |
| `.dockerignore` | Creado para excluir directorios pesados (`node_modules`, `dist`, `.git`) del build de Docker. |

---

## Resultado generado

Se completaron las siguientes implementaciones:
1. **Vitest configurado:** Suite de pruebas lista en el framework Vite con comandos integrados en los scripts de `package.json`.
2. **Prueba unitaria exitosa:** Test unitario en `SearchBar.test.jsx` corriendo satisfactoriamente, listo para capturar evidencia de éxito (`pnpm test`).
3. **Flujo de optimización y performance:** Pautas de auditoría en producción (`pnpm build` + `pnpm preview`) con Google Chrome Lighthouse, alcanzando puntajes mayores a 80.
4. **Entorno Docker listo:** Estructura de `Dockerfile` multi-etapa (Node + Nginx Alpine) y `.dockerignore` creada en la raíz del proyecto para despliegue y distribución en contenedores.

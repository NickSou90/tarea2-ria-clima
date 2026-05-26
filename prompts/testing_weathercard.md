# Prompt — Pruebas Unitarias para WeatherCard

## Conversación

**Fecha:** 2026-05-25  
**Objetivo:** Escribir las pruebas unitarias para el componente `WeatherCard` utilizando Vitest y React Testing Library, verificando el renderizado de la información del clima (temperatura, humedad, descripción) y el manejo de casos de borde (datos nulos).

---

## Prompt utilizado

> SearchBar.test.jsx Tambien lo quiero para el wherhercard

---

## Contexto del proyecto al momento del prompt

- Se venía de configurar Vitest y de escribir la primera prueba unitaria para el componente `SearchBar` en la Fase 4.
- El componente `WeatherCard` ya estaba integrado en la vista `Home`, pero carecía de cobertura de tests.
- Se necesitaba validar que el componente se comportara de forma correcta bajo diferentes escenarios, incluyendo datos normales de la API simulados (mock data) y el caso en que la información recibida fuese nula.

---

## Archivos analizados/creados para generar las pruebas

| Archivo | Acción / Descripción |
|---|---|
| `src/tests/WeatherCard.test.jsx` | Creado para realizar las pruebas unitarias del componente `WeatherCard`. Verifica el renderizado del nombre de la ciudad/país, redondeo de temperatura, visualización de humedad/descripción, y el caso extremo de recibir `null` como prop. |
| `src/components/WeatherCard.jsx` | Analizado para entender las propiedades (`weather`) y la lógica de renderizado del componente a probar. |

---

## Resultado generado

Se completó la suite de pruebas del componente de clima:
1. **Segundo test unitario operativo:** Se implementó `WeatherCard.test.jsx` con 4 casos de prueba distintos, asegurando una cobertura robusta de los posibles estados del componente.
2. **Robustez y buenas prácticas:** Se añadió un caso específico de borde ("Edge Case") para comprobar que el componente no falle ni rompa la aplicación al recibir datos nulos, renderizando un contenedor vacío.
3. **Ejecución exitosa de la suite:** Al ejecutar `pnpm test`, la terminal reportó todos los tests en verde ("passed"), listos para ser documentados en las capturas de evidencia de la entrega.

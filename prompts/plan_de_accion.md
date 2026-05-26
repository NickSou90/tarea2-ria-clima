# Prompt — Generación del Plan de Acción

## Conversación

**Fecha:** 2026-05-25  
**Objetivo:** Crear un plan de acción estructurado para el proyecto basado en los requerimientos de la guía de laboratorio, utilizando el contexto actual del repositorio.

---

## Prompt utilizado

> Tomando como referencia prompts/readme.md y 00-memory-bank.md haceme un plan de accion para este proyecto Tarea 2 RIA 2026 - Guía de Laboratorio Optimizada.pdf sabuendo que el tema elegido es el de el clima

---

## Contexto del proyecto al momento del prompt

- El proyecto ya contaba con la base de código inicial, un `README.md` bien documentado y su configuración base (React + Vite + MUI + React Router).
- Se proveyó el PDF con las instrucciones de la "Tarea 2 RIA 2026" para extraer los criterios de evaluación obligatorios (100 puntos en total).
- Se proveyeron los archivos `00-memory-bank.md` y `prompts/readme.md` como contexto de lo que ya se había avanzado.

---

## Archivos analizados para generar el Plan de Acción

| Archivo | Información extraída |
|---|---|
| `Tarea 2 RIA 2026 - Guía de Laboratorio Optimizada.pdf` | Reglas, stack permitido, criterios de evaluación, rúbrica, uso de IA y entregables esperados. |
| `00-memory-bank.md` | Contexto general, requerimiento estricto de LocalStorage y prohibición de base de datos propia. |
| `prompts/readme.md` | Estado de las vistas, componentes, servicios y herramientas configuradas actualmente en el proyecto. |

---

## Resultado generado

Se generó un documento de Plan de Implementación (`implementation_plan.md`) y una lista de tareas (`task.md`) estructurada en 5 fases críticas:
1. Diseño y Planificación (Mockups).
2. Consolidación del Desarrollo Frontend.
3. Testing y Performance.
4. Despliegue y Contenedorización.
5. Documentación y Entregables Finales.

Ambos artefactos se crearon para guiar el desarrollo de la aplicación del clima cumpliendo el 100% de la rúbrica del docente.

// Importamos los tres componentes clave de React Router DOM para manejar la navegación
// BrowserRouter: provee el contexto de rutas usando la API History del navegador
// Routes: contenedor que agrupa todas las rutas disponibles
// Route: define una ruta individual (URL → componente)
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos la vista principal de la aplicación
import Home from '../views/Home';

// Importamos la vista de detalles del pronóstico extendido
import ForecastDetails from '../views/ForecastDetails';

// Definimos y exportamos el componente AppRouter que centraliza todas las rutas de la app
export default function AppRouter() {
    return (
        // BrowserRouter envuelve toda la app para habilitar la navegación con React Router
        <BrowserRouter>
            {/* Routes evalúa la URL actual y renderiza SOLO la ruta que coincida */}
            <Routes>
                {/* Ruta 1: Página Principal — se activa cuando la URL es exactamente "/" */}
                <Route path="/" element={<Home />} />

                {/* Ruta 2: Página de Detalles — se activa cuando la URL es "/forecast" */}
                <Route path="/forecast" element={<ForecastDetails />} />
            </Routes>
        </BrowserRouter>
    );
}
// useState → maneja estados locales; useEffect → ejecuta lógica al montar el componente
import { useState, useEffect } from 'react';

// Importamos componentes de Material UI para construir la interfaz
import {
    Box,
    Button,
    Container,
    Typography,
    CircularProgress,
    Alert,
    Fade,
    Chip,
} from '@mui/material';

// Ícono de sol para el logo/encabezado de la app
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';

// Ícono de calendario para el botón de pronóstico
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

// Link de React Router para navegar entre rutas sin recargar la página
import { Link } from 'react-router-dom';

// Componente de barra de búsqueda de ciudad
import SearchBar from '../components/SearchBar';

// Componente de tarjeta que muestra los datos del clima actual
import WeatherCard from '../components/WeatherCard';

// Función del servicio que consulta el clima actual a la API de OpenWeatherMap
import { getCurrentWeather } from '../services/weatherService';

// ─── Componente principal: Home ────────────────────────────────────────────
export default function Home() {
    // Estado que almacena el objeto con los datos del clima (null = sin búsqueda todavía)
    const [weather, setWeather] = useState(null);

    // Estado booleano que indica si hay una petición en curso (true = mostrando spinner)
    const [loading, setLoading] = useState(false);

    // Estado que almacena el mensaje de error si la búsqueda falla (string vacío = sin error)
    const [error, setError] = useState('');

    // useEffect con [] vacío → se ejecuta una sola vez al montar el componente
    // Sirve para restaurar la última ciudad buscada cuando el usuario recarga la app
    useEffect(() => {
        const savedCity = localStorage.getItem('lastCity'); // Leemos la última ciudad del almacenamiento local
        if (savedCity) {
            handleSearch(savedCity); // Si existe, lanzamos la búsqueda automáticamente
        }
    }, []); // Sin dependencias: solo corre al montar (equivale a componentDidMount)

    // Función asíncrona que ejecuta la búsqueda del clima para la ciudad recibida
    const handleSearch = async (city) => {
        setLoading(true);    // Activa el spinner de carga
        setError('');        // Limpia cualquier error previo
        setWeather(null);    // Limpia la tarjeta de clima anterior mientras carga la nueva
        try {
            const data = await getCurrentWeather(city); // Llama al servicio con el nombre de la ciudad
            setWeather(data);                           // Guarda los datos del clima en el estado
            localStorage.setItem('lastCity', city);    // Persiste la ciudad en localStorage para la próxima visita
        } catch (err) {
            // Si la API falla (ciudad no encontrada, API key inválida, sin conexión), mostramos el error
            setError('No se pudo encontrar la ciudad. Revisa el nombre o tu API Key.');
        } finally {
            setLoading(false); // Siempre desactiva el spinner (éxito o error)
        }
    };

    return (
        // Contenedor raíz que ocupa al menos toda la altura de la pantalla
        <Box
            sx={{
                minHeight: '100vh',      // Altura mínima = 100% del viewport
                position: 'relative',    // Necesario para los orbes de fondo posicionados absolutamente
                overflow: 'hidden',      // Oculta los orbes que sobresalen del borde de la pantalla
                display: 'flex',
                flexDirection: 'column', // Organiza el contenido en columna
            }}
        >
            {/* ── Orbe decorativo superior izquierdo ── */}
            <Box
                sx={{
                    position: 'fixed',   // Fijo en pantalla (no se mueve con el scroll)
                    top: '-20%',         // Parcialmente fuera del borde superior
                    left: '-10%',        // Parcialmente fuera del borde izquierdo
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%', // Forma circular perfecta
                    background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', // Gradiente azul difuso
                    pointerEvents: 'none', // No interfiere con clicks del usuario
                    zIndex: 0,             // Detrás de todo el contenido
                }}
            />

            {/* ── Orbe decorativo inferior derecho ── */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '-10%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', // Gradiente violeta difuso
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* ── Contenido principal centrado ── */}
            <Container
                // maxWidth="md" limita el ancho a ~900px y centra el contenido horizontalmente
                maxWidth="md"
                sx={{
                    position: 'relative',
                    zIndex: 1,               // Por encima de los orbes decorativos
                    pt: { xs: 6, md: 10 },   // Padding top responsivo: 48px en móvil, 80px en desktop
                    pb: 6,
                    textAlign: 'center',     // Todo el texto centrado
                }}
            >
                {/* ── Encabezado con logo y título ── */}
                {/* Fade in timeout={600}: aparece gradualmente en 600ms */}
                <Fade in timeout={600}>
                    <Box>
                        {/* Círculo con ícono de sol y animación de pulso */}
                        <Box
                            sx={{
                                display: 'inline-flex',   // Contenedor en línea para centrar el ícono
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 72,
                                height: 72,
                                borderRadius: '50%',      // Forma circular
                                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', // Degradado azul-violeta
                                boxShadow: '0 8px 32px rgba(37,99,235,0.4)',                     // Sombra azul difusa
                                mb: 3,
                                // Animación de pulso definida con @keyframes de MUI
                                animation: 'pulse 3s ease-in-out infinite',
                                '@keyframes pulse': {
                                    '0%, 100%': { boxShadow: '0 8px 32px rgba(37,99,235,0.4)' },  // Sombra normal
                                    '50%': { boxShadow: '0 12px 48px rgba(37,99,235,0.65)' },      // Sombra más grande a la mitad
                                },
                            }}
                        >
                            {/* Ícono de sol blanco dentro del círculo */}
                            <WbSunnyRoundedIcon sx={{ fontSize: 36, color: '#fff' }} />
                        </Box>

                        {/* Título principal de la app con texto degradado */}
                        <Typography
                            // variant="h2": el título más importante de la página (semántica h2)
                            variant="h2"
                            sx={{
                                fontSize: { xs: '2rem', md: '3rem' }, // Responsivo: 32px móvil / 48px desktop
                                fontWeight: 800,
                                // Técnica CSS para texto con degradado de color
                                background: 'linear-gradient(135deg, #f1f5f9 30%, #60a5fa 70%, #a78bfa 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent', // El texto queda transparente → se ve el degradado de fondo
                                mb: 1,
                                letterSpacing: '-0.5px',
                            }}
                        >
                            Clima en Tiempo Real
                        </Typography>

                        {/* Subtítulo descriptivo de la aplicación */}
                        <Typography
                            // variant="body1": texto de párrafo estándar
                            variant="body1"
                            sx={{ color: 'text.secondary', mb: 5, fontSize: '1.05rem' }}
                        >
                            Consulta el clima de cualquier ciudad del mundo al instante
                        </Typography>
                    </Box>
                </Fade>

                {/* ── Barra de búsqueda ── */}
                {/* Fade in timeout={800}: aparece 200ms después que el encabezado */}
                <Fade in timeout={800}>
                    <Box>
                        {/* Pasamos handleSearch como prop onSearch para que SearchBar la llame al buscar */}
                        <SearchBar onSearch={handleSearch} />
                    </Box>
                </Fade>

                {/* ── Spinner de carga (solo visible mientras loading=true) ── */}
                {/* Fade in timeout={300}: aparece rápido para no demorar la retroalimentación */}
                {loading && (
                    <Fade in timeout={300}>
                        <Box sx={{ mt: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            {/* Spinner circular azul con efecto de brillo */}
                            <CircularProgress
                                // size={48}: diámetro del spinner en píxeles
                                size={48}
                                // thickness={3}: grosor del trazo del círculo
                                thickness={3}
                                sx={{
                                    color: 'primary.main',
                                    filter: 'drop-shadow(0 0 8px rgba(96,165,250,0.5))', // Halo azul luminoso
                                }}
                            />
                            <Typography variant="body2" color="text.secondary">
                                Buscando ciudad…
                            </Typography>
                        </Box>
                    </Fade>
                )}

                {/* ── Mensaje de error (solo visible si error no está vacío) ── */}
                {error && (
                    // Fade in timeout={400}: animación de 400ms para suavizar la aparición del error
                    <Fade in timeout={400}>
                        <Alert
                            // severity="error": define el tipo de alerta → ícono y paleta de colores rojos
                            severity="error"
                            sx={{
                                mt: 3,
                                maxWidth: 480,
                                mx: 'auto',
                                background: 'rgba(248,113,113,0.1)',
                                border: '1px solid rgba(248,113,113,0.3)',
                                color: '#fca5a5',
                                '& .MuiAlert-icon': { color: '#f87171' }, // Color del ícono de la alerta
                            }}
                        >
                            {error}
                        </Alert>
                    </Fade>
                )}

                {/* ── Tarjeta del clima (solo visible si weather tiene datos) ── */}
                {weather && (
                    // Fade in timeout={500}: la tarjeta aparece suavemente al cargar los datos
                    <Fade in timeout={500}>
                        <Box>
                            {/* WeatherCard recibe el objeto weather completo para mostrar todos los datos */}
                            <WeatherCard weather={weather} />
                        </Box>
                    </Fade>
                )}

                {/* ── Botón para ir a la vista de pronóstico de 5 días ── */}
                {/* Fade in timeout={1000}: aparece último, después de todo el contenido principal */}
                {/* mt: weather ? 4 : 6  → margen superior menor si ya hay una tarjeta visible */}
                <Fade in timeout={1000}>
                    <Box sx={{ mt: weather ? 4 : 6 }}>
                        <Button
                            // variant="outlined": botón con borde visible pero sin relleno sólido
                            variant="outlined"
                            // component={Link}: renderiza el Button usando el componente Link de React Router
                            // para navegar sin recargar la página
                            component={Link}
                            // to="/forecast": ruta destino al hacer clic en el botón
                            to="/forecast"
                            startIcon={<CalendarMonthRoundedIcon />}
                            // size="large": botón más grande para mejor visibilidad y área de clic
                            size="large"
                        >
                            Ver pronóstico de 5 días
                        </Button>
                    </Box>
                </Fade>

                {/* ── Chips de ciudades sugeridas ──
                    Solo se muestran cuando no hay clima cargado (!weather) y no está cargando (!loading).
                    Sirven como accesos rápidos para que el usuario pruebe la app sin escribir. */}
                {!weather && !loading && (
                    // Fade in timeout={1200}: el último elemento en aparecer, con retraso deliberado
                    <Fade in timeout={1200}>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1,
                                justifyContent: 'center',
                                flexWrap: 'wrap',  // Se adaptan a múltiples líneas en pantallas pequeñas
                                mt: 4,
                                opacity: 0.6,      // Ligeramente transparentes para no competir visualmente
                            }}
                        >
                            {/* Recorremos un array de ciudades populares y creamos un Chip por cada una */}
                            {['Buenos Aires', 'Madrid', 'Nueva York', 'Tokio', 'Londres'].map((city) => (
                                <Chip
                                    // key={city}: clave única requerida por React para listas, usa el nombre de ciudad
                                    key={city}
                                    // label={city}: texto visible dentro del chip
                                    label={city}
                                    size="small"
                                    // onClick: al hacer clic en un chip, lanza la búsqueda de esa ciudad directamente
                                    onClick={() => handleSearch(city)}
                                    sx={{
                                        cursor: 'pointer',
                                        background: 'rgba(255,255,255,0.07)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        color: 'text.secondary',
                                        fontSize: '0.78rem',
                                        '&:hover': {
                                            background: 'rgba(96,165,250,0.15)',
                                            borderColor: 'rgba(96,165,250,0.4)',
                                            color: 'primary.light', // Texto azul claro al hover
                                        },
                                        transition: 'all 0.2s ease', // Transición suave del hover
                                    }}
                                />
                            ))}
                        </Box>
                    </Fade>
                )}
            </Container>
        </Box>
    );
}
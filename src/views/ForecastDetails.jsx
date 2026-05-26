// Importamos hooks de React:
// useState → para manejar estados locales del componente
// useEffect → para ejecutar código al montar el componente (cargar datos de la API)
import { useState, useEffect } from 'react';

// Importamos los componentes de Material UI necesarios para construir la vista
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Fade,
    Skeleton,
    Chip,
    Alert,
} from '@mui/material';

// Ícono de flecha hacia atrás para el botón "Volver"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

// Ícono de viento (para mostrar velocidad del viento en cada tarjeta)
import AirRoundedIcon from '@mui/icons-material/AirRounded';

// Ícono de gota de agua (para mostrar humedad)
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';

// Ícono de termómetro (para mostrar sensación térmica)
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded';

// Link de React Router: navega entre rutas sin recargar la página
import { Link } from 'react-router-dom';

// Función del servicio que consulta el pronóstico de 5 días a la API
import { getForecast } from '../services/weatherService';

// Array con los nombres de los días de la semana en español, indexado igual que getDay() (0=Domingo)
const DAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// ─── Componente auxiliar: tarjeta esqueleto ────────────────────────────────
// Se muestra mientras los datos reales están cargando (placeholder animado)
function SkeletonCard() {
    return (
        <Card>
            <CardContent sx={{ p: 3 }}>
                {/* Skeleton de texto para el nombre del día */}
                <Skeleton variant="text" height={28} sx={{ mb: 1, background: 'rgba(255,255,255,0.1)' }} />
                {/* Skeleton circular para el ícono del clima */}
                <Skeleton variant="circular" width={56} height={56} sx={{ mx: 'auto', my: 1, background: 'rgba(255,255,255,0.1)' }} />
                {/* Skeleton de texto para la temperatura */}
                <Skeleton variant="text" height={40} sx={{ background: 'rgba(255,255,255,0.1)' }} />
                {/* Skeleton de texto para la descripción */}
                <Skeleton variant="text" height={20} sx={{ background: 'rgba(255,255,255,0.08)' }} />
            </CardContent>
        </Card>
    );
}

// ─── Componente principal: ForecastDetails ────────────────────────────────
export default function ForecastDetails() {
    // Estado que almacena el array de pronósticos diarios (uno por día)
    const [forecast, setForecast] = useState([]);

    // Estado que almacena el nombre de la ciudad tal como lo devuelve la API
    const [cityName, setCityName] = useState('');

    // Estado booleano que indica si la petición está en curso (true = mostrando skeletons)
    const [loading, setLoading] = useState(true);

    // Estado que almacena el mensaje de error si la petición falla (string vacío = sin error)
    const [error, setError] = useState('');

    // Leemos la última ciudad buscada desde localStorage; si no hay, usamos "Montevideo" por defecto
    const city = localStorage.getItem('lastCity') || 'Montevideo';

    // useEffect con array de dependencias vacío [] → se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Función interna asíncrona para poder usar await dentro del useEffect
        const fetchForecast = async () => {
            try {
                // Llamamos al servicio para obtener el pronóstico de la ciudad guardada
                const data = await getForecast(city);

                // Filtramos la lista para quedarnos solo con los registros de las 12:00:00
                // (uno por día, representativo del mediodía)
                const dailyData = data.list.filter(r => r.dt_txt.includes('12:00:00'));

                // Guardamos los registros filtrados en el estado
                setForecast(dailyData);

                // Guardamos el nombre oficial de la ciudad que devuelve la API (con tilde y mayúsculas)
                setCityName(data.city.name);
            } catch (err) {
                // Si la petición falla, guardamos el mensaje de error para mostrarlo al usuario
                setError('No se pudo cargar el pronóstico. Revisa tu conexión o API Key.');
                console.error(err); // También lo logueamos en consola para debugging
            } finally {
                // Siempre (éxito o error) desactivamos el estado de carga
                setLoading(false);
            }
        };
        fetchForecast(); // Ejecutamos la función de carga inmediatamente
    }, []); // El [] vacío asegura que esto solo corra una vez al montar el componente

    // Función auxiliar que devuelve un color según el rango de temperatura
    const getTempColor = (temp) => {
        if (temp >= 30) return '#f97316'; // Naranja: calor intenso (≥30°C)
        if (temp >= 20) return '#facc15'; // Amarillo: temperatura cálida (20-29°C)
        if (temp >= 10) return '#60a5fa'; // Azul claro: temperatura fresca (10-19°C)
        return '#a78bfa';                 // Violeta: temperatura fría (<10°C)
    };

    return (
        // Contenedor raíz que ocupa al menos toda la altura de la pantalla
        <Box
            sx={{
                minHeight: '100vh',    // Altura mínima = 100% del viewport
                position: 'relative',  // Necesario para que los orbes decorativos se posicionen correctamente
                overflow: 'hidden',    // Oculta los orbes que sobresalen del borde de la pantalla
            }}
        >
            {/* ── Orbe decorativo superior derecho ── */}
            <Box
                sx={{
                    position: 'fixed',      // Fijo en la pantalla (no se desplaza con el scroll)
                    top: '10%',             // Posición vertical desde arriba
                    right: '-5%',           // Parcialmente fuera del borde derecho
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',    // Forma circular
                    background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', // Gradiente radial violeta difuso
                    pointerEvents: 'none',  // No captura clicks del mouse
                    zIndex: 0,              // Detrás de todo el contenido
                }}
            />

            {/* ── Orbe decorativo inferior izquierdo ── */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '5%',
                    left: '-8%',
                    width: '450px',
                    height: '450px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)', // Gradiente radial azul difuso
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* ── Contenido principal ── */}
            <Container
                // maxWidth="lg": limita el ancho a ~1200px, ideal para una grilla de múltiples tarjetas
                maxWidth="lg"
                sx={{ position: 'relative', zIndex: 1, pt: { xs: 4, md: 7 }, pb: 8 }}
            >
                {/* Botón "Volver al inicio" con animación de entrada de 400ms */}
                <Fade in timeout={400}>
                    <Button
                        // component={Link}: renderiza el Button como Link de React Router
                        // para navegar sin recargar la página
                        component={Link}
                        // to="/": navega a la ruta raíz (Home) al hacer clic
                        to="/"
                        startIcon={<ArrowBackRoundedIcon />}
                        sx={{
                            mb: 5,
                            color: 'text.secondary',
                            '&:hover': { color: 'primary.light', background: 'rgba(96,165,250,0.08)' },
                        }}
                    >
                        Volver al inicio
                    </Button>
                </Fade>

                {/* ── Encabezado de la sección ── */}
                {/* Fade in timeout={600}: aparece en 600ms, después del botón de volver */}
                <Fade in timeout={600}>
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        {/* Chip badge que indica que es el pronóstico extendido */}
                        <Chip
                            label="Pronóstico extendido"
                            // size="small": versión compacta del chip
                            size="small"
                            sx={{
                                background: 'rgba(96,165,250,0.15)',
                                border: '1px solid rgba(96,165,250,0.3)',
                                color: 'primary.light',
                                mb: 2,
                                fontSize: '0.8rem',
                            }}
                        />

                        {/* Si ya tenemos el nombre de la ciudad, lo mostramos con degradado; sino, un Skeleton */}
                        {cityName ? (
                            <Typography
                                // variant="h3": título grande para el nombre de la ciudad
                                variant="h3"
                                sx={{
                                    fontSize: { xs: '1.8rem', md: '2.5rem' }, // Responsivo
                                    fontWeight: 800,
                                    // Texto con degradado de color (técnica CSS clip-text)
                                    background: 'linear-gradient(135deg, #f1f5f9 30%, #60a5fa 70%, #a78bfa 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent', // Hace el texto transparente para ver el degradado
                                    mb: 1,
                                }}
                            >
                                {cityName}
                            </Typography>
                        ) : (
                            // Placeholder mientras carga el nombre de la ciudad
                            <Skeleton
                                // variant="text": skeleton con forma de una línea de texto
                                variant="text"
                                width={200}
                                height={56}
                                sx={{ mx: 'auto', background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}
                            />
                        )}

                        {/* Subtítulo descriptivo de la sección */}
                        <Typography variant="body1" color="text.secondary">
                            Los próximos 5 días de un vistazo
                        </Typography>
                    </Box>
                </Fade>

                {/* ── Mensaje de error (solo se muestra si `error` no está vacío) ── */}
                {error && (
                    // Fade in timeout={400}: aparición suave del mensaje de error
                    <Fade in timeout={400}>
                        <Alert
                            // severity="error": tipo de alerta → muestra ícono y colores en tonos rojos
                            severity="error"
                            sx={{
                                mb: 4,
                                background: 'rgba(248,113,113,0.1)',
                                border: '1px solid rgba(248,113,113,0.3)',
                                color: '#fca5a5',
                                '& .MuiAlert-icon': { color: '#f87171' }, // Color del ícono de error
                            }}
                        >
                            {error}
                        </Alert>
                    </Fade>
                )}

                {/* ── Grilla de tarjetas de pronóstico ── */}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',          // Las tarjetas se envuelven a la siguiente línea si no caben
                        justifyContent: 'center',  // Centra las tarjetas horizontalmente
                        gap: 3,                    // Espacio de 24px entre tarjetas
                    }}
                >
                    {loading
                        // Si está cargando: mostramos 5 skeletons como placeholder
                        ? Array.from({ length: 5 }).map((_, i) => (
                            <Box key={i} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: '180px' }, flexShrink: 0 }}>
                                <SkeletonCard />
                            </Box>
                        ))
                        // Si ya cargó: renderizamos una tarjeta por cada día del pronóstico
                        : forecast.map((day, index) => {
                            // Redondeamos la temperatura del día a entero
                            const tempVal = Math.round(day.main.temp);

                            // Obtenemos el color según la temperatura
                            const tempColor = getTempColor(tempVal);

                            // Obtenemos el nombre del día en español usando el índice del día de la semana
                            const dayName = DAYS_ES[new Date(day.dt_txt).getDay()];

                            // Formateamos la fecha como "26 may" en español
                            const date = new Date(day.dt_txt).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'short',
                            });

                            return (
                                // Wrapper de ancho responsivo para cada tarjeta
                                <Box
                                    // key={index}: clave única requerida por React para elementos de una lista
                                    key={index}
                                    sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: '180px' }, flexShrink: 0 }}
                                >
                                    {/* Animación escalonada: cada tarjeta aparece 120ms después que la anterior */}
                                    {/* timeout={400 + index * 120}: la primera en 400ms, la segunda en 520ms, etc. */}
                                    <Fade in timeout={400 + index * 120}>
                                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent
                                                sx={{
                                                    p: 3,
                                                    display: 'flex',
                                                    flexDirection: 'column', // Organiza el contenido en columna
                                                    alignItems: 'center',    // Centra todo horizontalmente
                                                    gap: 1,                  // Espacio de 8px entre elementos
                                                    flexGrow: 1,             // Ocupa todo el alto disponible de la Card
                                                }}
                                            >
                                                {/* Nombre del día (ej: "Martes") */}
                                                <Typography
                                                    // variant="subtitle1": texto con peso intermedio, ideal para encabezados de sección
                                                    variant="subtitle1"
                                                    fontWeight={700}
                                                    sx={{ color: 'text.primary', textTransform: 'capitalize' }}
                                                >
                                                    {dayName}
                                                </Typography>

                                                {/* Fecha formateada (ej: "27 may") */}
                                                <Typography variant="caption" color="text.secondary" sx={{ mt: -0.5 }}>
                                                    {date}
                                                </Typography>

                                                {/* Contenedor circular para el ícono del clima */}
                                                <Box
                                                    sx={{
                                                        width: 64,
                                                        height: 64,
                                                        borderRadius: '50%',                  // Forma circular
                                                        background: 'rgba(255,255,255,0.06)', // Fondo sutil
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        my: 1,
                                                    }}
                                                >
                                                    {/* Ícono del clima del día. @2x = resolución media (doble de pixels) */}
                                                    <img
                                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                                        // alt: texto alternativo accesible para lectores de pantalla
                                                        alt={day.weather[0].description}
                                                        width={52}
                                                        height={52}
                                                    />
                                                </Box>

                                                {/* Temperatura del día con color dinámico según el calor */}
                                                <Typography
                                                    // variant="h4": número de temperatura grande y llamativo
                                                    variant="h4"
                                                    fontWeight={800}
                                                    sx={{ color: tempColor, lineHeight: 1 }}
                                                >
                                                    {tempVal}°
                                                </Typography>

                                                {/* Descripción del clima en texto pequeño */}
                                                <Typography
                                                    // variant="caption": el texto más pequeño disponible en el tema
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{ textTransform: 'capitalize', textAlign: 'center', lineHeight: 1.3 }}
                                                >
                                                    {day.weather[0].description}
                                                </Typography>

                                                {/* ── Stats extra al pie de la tarjeta ──
                                                    mt: 'auto' empuja este bloque hacia el fondo de la Card */}
                                                <Box
                                                    sx={{
                                                        mt: 'auto',
                                                        pt: 2,
                                                        width: '100%',
                                                        borderTop: '1px solid rgba(255,255,255,0.07)', // Línea divisoria sutil
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {/* Fila de humedad */}
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                                        <WaterDropRoundedIcon sx={{ fontSize: 14, color: '#60a5fa' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {day.main.humidity}% {/* Porcentaje de humedad relativa */}
                                                        </Typography>
                                                    </Box>

                                                    {/* Fila de viento */}
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                                        <AirRoundedIcon sx={{ fontSize: 14, color: '#a78bfa' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {day.wind.speed} m/s {/* Velocidad del viento en metros por segundo */}
                                                        </Typography>
                                                    </Box>

                                                    {/* Fila de sensación térmica */}
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                                        <ThermostatRoundedIcon sx={{ fontSize: 14, color: '#f472b6' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            {/* Math.round: redondea la sensación térmica al entero más cercano */}
                                                            Sens. {Math.round(day.main.feels_like)}°
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Fade>
                                </Box>
                            );
                        })}
                </Box>
            </Container>
        </Box>
    );
}
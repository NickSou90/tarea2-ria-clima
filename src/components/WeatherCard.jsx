// Importamos los componentes de Material UI necesarios para construir la tarjeta
import { Card, CardContent, Typography, Box, Divider, Chip } from '@mui/material';

// Ícono de viento (aire)
import AirRoundedIcon from '@mui/icons-material/AirRounded';

// Ícono de gota de agua (humedad)
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';

// Ícono de termómetro (sensación térmica)
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded';

// Ícono de visibilidad
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

// Definimos y exportamos el componente; recibe el objeto `weather` con los datos del clima
export default function WeatherCard({ weather }) {
    // Si no hay datos de clima todavía, no renderiza nada (evita errores)
    if (!weather) return null;

    // Construimos la URL del ícono del clima usando el código que devuelve la API (@4x = alta resolución)
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

    // Redondeamos la temperatura actual a número entero
    const temp = Math.round(weather.main.temp);

    // Redondeamos la sensación térmica a número entero
    const feelsLike = Math.round(weather.main.feels_like);

    // Redondeamos la temperatura máxima del día
    const tempMax = Math.round(weather.main.temp_max);

    // Redondeamos la temperatura mínima del día
    const tempMin = Math.round(weather.main.temp_min);

    // Función que devuelve un color según el rango de temperatura (para colorear el número grande)
    const getTempColor = (t) => {
        if (t >= 30) return '#f97316'; // Naranja: calor intenso (≥30°C)
        if (t >= 20) return '#facc15'; // Amarillo: temperatura cálida (20-29°C)
        if (t >= 10) return '#60a5fa'; // Azul claro: temperatura fresca (10-19°C)
        return '#a78bfa';              // Violeta: temperatura fría (<10°C)
    };

    // Array de objetos que define cada estadística secundaria a mostrar en la grilla
    const stats = [
        // Humedad relativa del aire en porcentaje
        { icon: <WaterDropRoundedIcon sx={{ fontSize: 18, color: '#60a5fa' }} />, label: 'Humedad', value: `${weather.main.humidity}%` },
        // Velocidad del viento en metros por segundo
        { icon: <AirRoundedIcon sx={{ fontSize: 18, color: '#a78bfa' }} />, label: 'Viento', value: `${weather.wind.speed} m/s` },
        // Sensación térmica en grados Celsius
        { icon: <ThermostatRoundedIcon sx={{ fontSize: 18, color: '#f472b6' }} />, label: 'Sensación', value: `${feelsLike}°C` },
        // Visibilidad en kilómetros (la API la devuelve en metros, dividimos por 1000)
        { icon: <VisibilityRoundedIcon sx={{ fontSize: 18, color: '#34d399' }} />, label: 'Visibilidad', value: weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : '—' },
    ];

    return (
        // Card es el contenedor principal con estilos de glassmorphism definidos en theme.js
        <Card
            sx={{
                maxWidth: 460,       // Ancho máximo de la tarjeta
                mx: 'auto',         // Centrada horizontalmente en la página
                mt: 4,              // Margen superior de 32px
                overflow: 'hidden', // Oculta el contenido que sobresalga (necesario para la franja decorativa)
                position: 'relative', // Necesario para posicionar la franja absoluta dentro
            }}
        >
            {/* Franja de color decorativa en la parte superior de la tarjeta */}
            <Box
                sx={{
                    position: 'absolute', // Se posiciona respecto al Card padre
                    top: 0,              // Pegada al borde superior
                    left: 0,             // Desde el borde izquierdo
                    right: 0,            // Hasta el borde derecho
                    height: 3,           // Solo 3px de alto (es una línea fina)
                    background: 'linear-gradient(90deg, #2563eb, #7c3aed, #ec4899)', // Degradado azul-violeta-rosa
                }}
            />

            {/* Contenido principal de la tarjeta con padding responsivo */}
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                {/* Fila superior: nombre de ciudad + país a la izquierda, chip de condición a la derecha */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                        {/* Nombre de la ciudad en negrita */}
                        <Typography variant="h5" fontWeight={800} sx={{ lineHeight: 1.1 }}>
                            {weather.name}
                        </Typography>
                        {/* Código del país en texto secundario (ej: AR, ES, US) */}
                        <Typography variant="body2" color="text.secondary">
                            {weather.sys.country}
                        </Typography>
                    </Box>
                    {/* Chip con la condición general del clima (ej: "Clouds", "Rain") */}
                    <Chip
                        label={weather.weather[0].main} // Texto principal de la condición
                        size="small"
                        sx={{
                            background: 'rgba(96,165,250,0.15)',         // Fondo azul translúcido
                            border: '1px solid rgba(96,165,250,0.3)',    // Borde azul suave
                            color: 'primary.light',                      // Texto azul claro
                            fontSize: '0.75rem',                         // Fuente pequeña
                        }}
                    />
                </Box>

                {/* Sección central: temperatura grande + ícono del clima */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between', // Temperatura a la izquierda, ícono a la derecha
                        my: 2,
                    }}
                >
                    <Box>
                        {/* Número de temperatura grande con color dinámico según el calor */}
                        <Typography
                            variant="h1"
                            fontWeight={800}
                            sx={{
                                fontSize: { xs: '4rem', sm: '5rem' }, // Responsivo: más pequeño en móvil
                                color: getTempColor(temp),             // Color según temperatura
                                lineHeight: 1,
                                letterSpacing: '-2px',                 // Letras más juntas para estética
                            }}
                        >
                            {temp}° {/* Temperatura redondeada con símbolo de grado */}
                        </Typography>
                        {/* Descripción del clima en minúsculas (ej: "lluvia ligera") */}
                        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize', mt: 0.5 }}>
                            {weather.weather[0].description}
                        </Typography>
                        {/* Temperaturas máxima y mínima del día */}
                        <Typography variant="caption" color="text.secondary">
                            Máx. {tempMax}° · Mín. {tempMin}°
                        </Typography>
                    </Box>

                    {/* Contenedor circular con fondo difuso que enmarca el ícono del clima */}
                    <Box
                        sx={{
                            width: 110,                              // Ancho del círculo
                            height: 110,                             // Alto del círculo
                            borderRadius: '50%',                     // Lo hace completamente circular
                            background: 'rgba(255,255,255,0.05)',    // Fondo blanco muy translúcido
                            border: '1px solid rgba(255,255,255,0.1)', // Borde blanco sutil
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,                           // No se encoge si el espacio es reducido
                        }}
                    >
                        {/* Ícono del clima obtenido de OpenWeatherMap */}
                        <img src={iconUrl} alt={weather.weather[0].description} width={90} height={90} />
                    </Box>
                </Box>

                {/* Línea divisoria horizontal semitransparente entre la temperatura y las estadísticas */}
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)', my: 2.5 }} />

                {/* Grilla 2x2 con las estadísticas secundarias del clima */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)', // Dos columnas de igual ancho
                        gap: 2,                                // Espacio de 16px entre celdas
                    }}
                >
                    {/* Recorremos el array `stats` y renderizamos una celda por cada elemento */}
                    {stats.map(({ icon, label, value }) => (
                        <Box
                            key={label} // Clave única usando el nombre del stat (Humedad, Viento, etc.)
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,                                    // Espacio entre ícono y texto
                                p: 1.5,                                    // Padding interno de 12px
                                borderRadius: 2,                           // Bordes redondeados
                                background: 'rgba(255,255,255,0.04)',      // Fondo muy sutil
                                border: '1px solid rgba(255,255,255,0.07)', // Borde apenas visible
                            }}
                        >
                            {icon} {/* Ícono de MUI específico para este stat */}
                            <Box>
                                {/* Etiqueta del stat (ej: "Humedad") en texto pequeño gris */}
                                <Typography variant="caption" color="text.secondary" display="block" lineHeight={1.1}>
                                    {label}
                                </Typography>
                                {/* Valor del stat (ej: "75%") en negrita */}
                                <Typography variant="body2" fontWeight={600}>
                                    {value}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
}
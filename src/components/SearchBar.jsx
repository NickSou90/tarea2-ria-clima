// Importamos el hook useState de React para manejar el estado interno del componente
import { useState } from 'react';

// Importamos los componentes de Material UI que usaremos para construir el formulario
import { TextField, Button, Box, InputAdornment } from '@mui/material';

// Importamos el ícono de lupa redondeada para el botón de búsqueda
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

// Importamos el ícono de ubicación redondeado para el adorno del input
import MyLocationRoundedIcon from '@mui/icons-material/MyLocationRounded';

// Definimos y exportamos el componente SearchBar; recibe la prop `onSearch` (función callback)
export default function SearchBar({ onSearch }) {
    // Estado local que almacena el texto que escribe el usuario en el campo de búsqueda
    const [city, setCity] = useState('');

    // Función que se ejecuta cuando el formulario es enviado
    const handleSearch = (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        if (city.trim() !== '') {      // Solo busca si el campo no está vacío (ignorando espacios)
            onSearch(city.trim());     // Llama al callback del padre con el nombre de la ciudad limpio
            setCity('');              // Limpia el campo de texto después de buscar
        }
    };

    return (
        // Box actúa como un <form> con estilos de flexbox para alinear input y botón
        <Box
            component="form"        // Renderiza este Box como un elemento <form> de HTML
            onSubmit={handleSearch} // Ejecuta handleSearch cuando se envía el formulario
            sx={{
                display: 'flex',         // Alinea los hijos (input + botón) en fila
                gap: 1.5,               // Espacio de 12px entre el input y el botón
                justifyContent: 'center', // Centra el contenido horizontalmente
                maxWidth: 540,           // Ancho máximo del formulario
                mx: 'auto',             // Margen automático a los lados para centrar en la página
            }}
        >
            {/* Campo de texto donde el usuario escribe el nombre de la ciudad */}
            <TextField
                placeholder="Busca una ciudad..."  // Texto guía que aparece cuando el campo está vacío
                variant="outlined"                 // Estilo con borde visible
                fullWidth                           // Ocupa todo el ancho disponible dentro del Box
                value={city}                        // El valor del input está controlado por el estado `city`
                onChange={(e) => setCity(e.target.value)} // Actualiza el estado cada vez que el usuario escribe
                InputProps={{
                    // Agrega un adorno (ícono) al inicio (izquierda) del input
                    startAdornment: (
                        <InputAdornment position="start">
                            {/* Ícono de ubicación de color gris secundario, tamaño 20px */}
                            <MyLocationRoundedIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    // Sobreescribe el estilo del input de MUI para ajustar el tamaño de fuente y padding vertical
                    '& .MuiOutlinedInput-root': {
                        fontSize: '1rem',  // Tamaño de la fuente del texto ingresado
                        py: 0.25,          // Padding vertical interno de 2px (hace el input más compacto)
                    },
                }}
            />

            {/* Botón de búsqueda que envía el formulario al hacer clic */}
            <Button
                type="submit"         // Al hacer clic dispara el evento onSubmit del formulario
                variant="contained"   // Estilo de botón relleno (con fondo)
                size="large"          // Tamaño grande del botón
                sx={{ px: 3, minWidth: 'auto', flexShrink: 0 }} // Padding horizontal; no se encoge si el espacio es chico
                aria-label="Buscar ciudad" // Etiqueta de accesibilidad para lectores de pantalla
            >
                {/* Ícono de lupa dentro del botón */}
                <SearchRoundedIcon />
            </Button>
        </Box>
    );
}
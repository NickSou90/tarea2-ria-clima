// Importamos la función de MUI para crear un tema personalizado
import { createTheme } from '@mui/material/styles';

// Creamos el tema global de la aplicación y lo guardamos en `theme`
const theme = createTheme({
    // ── Paleta de colores ──────────────────────────────────────────────────────
    palette: {
        mode: 'dark', // Activa el modo oscuro en todos los componentes de MUI

        // Color primario: azul usado en botones, links y acentos principales
        primary: {
            main: '#60a5fa',  // Azul medio (color principal)
            light: '#93c5fd', // Azul claro (hover, textos secundarios)
            dark: '#2563eb',  // Azul oscuro (fondos de botones contained)
        },

        // Color secundario: violeta usado en chips, acentos alternativos
        secondary: {
            main: '#a78bfa',  // Violeta medio
            light: '#c4b5fd', // Violeta claro
            dark: '#7c3aed',  // Violeta oscuro
        },

        // Colores de fondo de la aplicación
        background: {
            default: '#0a0f1e',              // Fondo global de la página (azul marino muy oscuro)
            paper: 'rgba(255,255,255,0.05)', // Fondo de tarjetas y superficies (blanco 5% opaco = glassmorphism)
        },

        // Colores de texto
        text: {
            primary: '#f1f5f9',   // Texto principal: blanco suave
            secondary: '#94a3b8', // Texto secundario: gris azulado
        },

        // Color de error (mensajes de alerta, validaciones)
        error: {
            main: '#f87171', // Rojo suave
        },
    },

    // ── Tipografía ─────────────────────────────────────────────────────────────
    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif', // Fuente principal (Inter) con fallbacks
        h1: { fontWeight: 800 }, // Títulos de nivel 1 en extra negrita
        h2: { fontWeight: 700 }, // Títulos de nivel 2 en negrita
        h3: { fontWeight: 700 }, // Títulos de nivel 3 en negrita
        h4: { fontWeight: 700 }, // Títulos de nivel 4 en negrita
        h5: { fontWeight: 600 }, // Títulos de nivel 5 semi-negrita
        h6: { fontWeight: 600 }, // Títulos de nivel 6 semi-negrita
    },

    // ── Forma ──────────────────────────────────────────────────────────────────
    shape: {
        borderRadius: 16, // Radio de borde global; todas las Cards/inputs heredan esto por defecto
    },

    // ── Sobreescritura de componentes específicos ──────────────────────────────
    components: {
        // Personalización global de todas las Cards de MUI
        MuiCard: {
            styleOverrides: {
                root: {
                    background: 'rgba(255,255,255,0.05)',   // Fondo semitransparente (glassmorphism)
                    backdropFilter: 'blur(20px)',            // Desenfoque del fondo detrás de la tarjeta
                    border: '1px solid rgba(255,255,255,0.1)', // Borde blanco muy sutil
                    borderRadius: 20,                        // Bordes más redondeados que el global (20px)
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease', // Animación suave al hacer hover
                    '&:hover': {
                        transform: 'translateY(-4px)',                      // Sube 4px al pasar el mouse
                        boxShadow: '0 20px 40px rgba(96, 165, 250, 0.2)', // Sombra azul difusa al hacer hover
                    },
                },
            },
        },

        // Personalización global de todos los Buttons de MUI
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,          // Bordes redondeados de 12px
                    textTransform: 'none',     // Evita que el texto se convierta a MAYÚSCULAS automáticamente
                    fontWeight: 600,           // Texto semi-negrita
                    fontSize: '0.95rem',       // Tamaño de fuente ligeramente menor al estándar
                    padding: '10px 24px',      // Padding interno del botón
                    transition: 'all 0.25s ease', // Transición suave para todos los cambios de estilo
                },
                // Estilo específico para botones de variante "contained" (rellenos)
                contained: {
                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', // Degradado azul → violeta
                    boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',                  // Sombra azul difusa
                    '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)', // Degradado más oscuro al hover
                        boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',                  // Sombra más pronunciada
                        transform: 'translateY(-1px)',                                    // Pequeño efecto de elevación
                    },
                },
                // Estilo específico para botones de variante "outlined" (con borde)
                outlined: {
                    borderColor: 'rgba(96, 165, 250, 0.5)', // Borde azul translúcido
                    color: '#60a5fa',                        // Texto azul
                    '&:hover': {
                        borderColor: '#60a5fa',                     // Borde azul sólido al hover
                        background: 'rgba(96, 165, 250, 0.1)',      // Fondo azul muy leve al hover
                    },
                },
            },
        },

        // Personalización global de todos los TextFields de MUI
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': { // Selector del input interno con borde
                        borderRadius: 12,                          // Bordes redondeados de 12px
                        background: 'rgba(255,255,255,0.05)',      // Fondo translúcido tipo glass
                        backdropFilter: 'blur(10px)',              // Desenfoque del fondo detrás del input
                        '& fieldset': {
                            borderColor: 'rgba(255,255,255,0.15)', // Borde blanco sutil en estado normal
                        },
                        '&:hover fieldset': {
                            borderColor: 'rgba(96, 165, 250, 0.5)', // Borde azul translúcido al hacer hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#60a5fa', // Borde azul sólido cuando el input tiene el foco
                        },
                    },
                },
            },
        },

        // Personalización global de todos los Alerts de MUI
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: 12,          // Bordes redondeados de 12px
                    backdropFilter: 'blur(10px)', // Desenfoque del fondo para consistencia con el estilo glass
                },
            },
        },
    },
});

// Exportamos el tema para usarlo en el ThemeProvider de la app (en main.jsx o App.jsx)
export default theme;

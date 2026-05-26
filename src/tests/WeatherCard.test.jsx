import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WeatherCard from '../components/WeatherCard';

const mockWeather = {
    name: 'Montevideo',
    sys: { country: 'UY' },
    main: {
        temp: 22.5,
        humidity: 60,
        feels_like: 21 // Agregamos esto para evitar el NaN que sale en tu captura
    },
    weather: [
        {
            description: 'cielo claro',
            icon: '01d',
        },
    ],
    wind: {
        speed: 5.5,
    },
};

describe('WeatherCard Component', () => {
    it('debe mostrar el nombre de la ciudad y el país', () => {
        render(<WeatherCard weather={mockWeather} />);

        // Buscamos los textos por separado ya que están en etiquetas diferentes
        expect(screen.getByText(/Montevideo/i)).toBeInTheDocument();
        expect(screen.getByText(/UY/i)).toBeInTheDocument();
    });

    it('debe mostrar la temperatura redondeada', () => {
        render(<WeatherCard weather={mockWeather} />);

        // En tu captura se ve que el componente renderiza "23" y "°" por separado
        // Buscamos solo el número que es lo que nos importa
        expect(screen.getByText(/23/i)).toBeInTheDocument();
    });

    it('debe mostrar la descripción del clima y la humedad', () => {
        render(<WeatherCard weather={mockWeather} />);

        expect(screen.getByText(/cielo claro/i)).toBeInTheDocument();
        // Buscamos el valor de la humedad
        expect(screen.getByText(/60%/i)).toBeInTheDocument();
    });

    it('no debe mostrar nada si el objeto weather es nulo', () => {
        const { container } = render(<WeatherCard weather={null} />);
        expect(container.firstChild).toBeNull();
    });
});
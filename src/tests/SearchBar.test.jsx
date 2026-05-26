import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
    it('debe renderizar el campo de texto y el botón de búsqueda', () => {
        // Simulamos una función vacía para el prop onSearch
        render(<SearchBar onSearch={() => { }} />);

        // Verificamos que el input de texto exista
        const inputElement = screen.getByLabelText(/Buscar ciudad/i);
        expect(inputElement).toBeInTheDocument();

        // Verificamos que el botón exista
        const buttonElement = screen.getByRole('button', { name: /Buscar/i });
        expect(buttonElement).toBeInTheDocument();
    });
});
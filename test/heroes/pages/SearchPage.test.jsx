import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate= jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('||SearchPage|| TEST', () => { 

    beforeEach(() => jest.clearAllMocks());

    test('should display correctly with default values', () => { 

        const { container } = render( 
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect( container ).toMatchSnapshot();

    })

    test('should display the superhero and the query string', () => { 

        render( 
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');

        const img = screen.getByRole('img');
        expect( img.src ).toContain('jpg');

        const divError = screen.getByLabelText('alert-danger');
        expect( divError.style.display ).toBe('none');
    })

    test('should display an error If there is not any hero', () => { 

        render( 
            <MemoryRouter initialEntries={['/search?q=qqqq']}>
                <SearchPage />
            </MemoryRouter>
        )

        const divError = screen.getByLabelText('alert-danger');
        expect( divError.style.display ).toBe('');

    })

    test('should trigger the query input', () => {

        render( 
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText', value: 'spiderman' }});

        const form = screen.getByLabelText('form');
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=spiderman');

    })

})
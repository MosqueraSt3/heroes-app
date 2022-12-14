import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router/AppRouter';

describe('||AppRouter|| TEST', () => { 

    test('should display the login If the user is not authenticated', () => {

        const contextValue = {
            logged: false,
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length ).toBe(2);

    })

    test('should display marvel component If the user is authentincated', () => { 

        const contextValue = {
            logged: true,
            user: {
                id: 'test-id',
                name: 'test',
            },
        };

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByRole('heading', { level: 1 }).innerHTML ).toBe('Marvel Comics');

    })

})
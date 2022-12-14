import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router/PublicRoute';

describe('||PublicRoute|| test', () => { 

    test('Should display the children If the user is not authenticated', () => {

        const contextValue = {
            logged: false,
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Test</h1>
                </PublicRoute> 
            </AuthContext.Provider>
        );

        expect( screen.getByText('Test') ).toBeTruthy();

    })

    test('Should navigate If the user is authenticated', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'test-id',
                name: 'test',
            },
        };

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Test</h1>
                            </PublicRoute> 
                        } />
                        <Route path='marvel' element={ <h1>Marvel test</h1> } />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Marvel test') ).toBeTruthy();

    })

})
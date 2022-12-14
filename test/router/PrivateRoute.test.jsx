import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('||PrivateRoute|| test', () => { 

    test('Should display the children If the user is authenticated', () => {

        Storage.prototype.setItem = jest.fn();

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
                    <PrivateRoute>
                        <h1>Marvel test</h1>
                    </PrivateRoute> 
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect( screen.getByText('Marvel test') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');

    })

    test('Should not navigate If the user is not authenticated', () => {

        const contextValue = {
            logged: false,
        }

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path='marvel' element={
                            <PrivateRoute>
                                <h1>Marvel test</h1>
                            </PrivateRoute> 
                        } />
                        <Route path='login' element={ <h1>Test</h1> } />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        screen.debug();
        expect( screen.getByText('Test') ).toBeTruthy();

    })

})
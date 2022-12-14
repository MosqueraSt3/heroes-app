import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui/components/Navbar';

const mockedUseNavigate= jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate,
}));

describe('||Navbar||', () => { 

    beforeEach(() => jest.clearAllMocks());

    const contextValue = {
        logged: true,
        user: {
            id: 'test-id',
            name: 'test'
        },
        logout: jest.fn(),
    };

    beforeEach(() => jest.clearAllMocks());

    test('should display the user name', () => { 

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('test') ).toBeTruthy();

    })

    test('should call the navigate function', () => { 

    })

    test('should logout works normally', () => { 

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith('login', {"replace": true});
    })

})
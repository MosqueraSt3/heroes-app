import { authReducer } from '../../../src/auth/context/authReducer';
import { types } from '../../../src/auth/types/types';

describe('||authReducer|| TEST', () => { 

    test('should return the default state', () => { 
        const state = authReducer({ logged: false }, {});

        expect( state ).toEqual( { logged: false } );
    })

    test('should login works normally', () => { 
        const action = {
            type: types.login,
            payload: {
                id: 'test-id',
                name: 'test',
            }
        };

        const state = authReducer({ logged: false }, action);
        expect( state ).toEqual({
            logged: true,
            user: action.payload,
        });
    })

    test('should logout works normally', () => { 
        const action = {
            type: types.logout,
        };

        const state = authReducer({ logged: true }, action);
        expect( state ).toEqual({ logged: false });
    })

})
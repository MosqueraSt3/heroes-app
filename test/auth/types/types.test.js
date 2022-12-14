import { types } from '../../../src/auth/types/types';

describe('||types|| test', () => { 

    test('should exist the types', () => { 
        const { login, logout } = types;
        expect( login ).toBe('[Auth] Login');
        expect( logout ).toBe('[Auth] Logout');
    })

})
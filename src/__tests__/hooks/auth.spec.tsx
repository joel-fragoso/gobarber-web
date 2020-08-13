import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import { useAuth, AuthProvider } from '../../hooks/auth';

const apiMock = new MockAdapter(api);

describe('Auth Hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('/sessions').reply(200, {
      user: {
        id: 'uuid',
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
      token: 'jwt',
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com',
      password: 'secret',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', 'jwt');
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify({
        id: 'uuid',
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    );
    expect(result.current.user.email).toEqual('johndoe@example.com');
  });
});

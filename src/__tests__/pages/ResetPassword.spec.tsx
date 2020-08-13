import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import ResetPassword from '../../pages/ResetPassword';

const apiMock = new MockAdapter(api);

const mockedHistoryPush = jest.fn();

const mockedLocationSearch = jest.fn();

const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    useLocation: () => ({
      search: mockedLocationSearch,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('ResetPassword Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to reset password', async () => {
    const { getByPlaceholderText, getByText } = render(<ResetPassword />);

    const passwordField = getByPlaceholderText('Nova senha');
    const passwordConfirmationField = getByPlaceholderText(
      'Confirmção da senha',
    );
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordField, { target: { value: 'secret' } });
    fireEvent.change(passwordConfirmationField, {
      target: { value: 'secret' },
    });

    fireEvent.click(buttonElement);

    apiMock.onPost('/password/reset').reply(200, {
      user: { password: 'secret' },
    });

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'success' }),
      );
    });
  });

  // it('should not be able to sign un with invalid fields', async () => {
  //   const { getByPlaceholderText, getByText } = render(<ResetPassword />);

  //   const nameField = getByPlaceholderText('Nome');
  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Cadastrar');

  //   fireEvent.change(nameField, { target: { value: 'John Doe' } });
  //   fireEvent.change(emailField, { target: { value: 'not-valid-email' } });
  //   fireEvent.change(passwordField, { target: { value: 'secret' } });

  //   fireEvent.click(buttonElement);

  //   await waitFor(() => expect(mockedHistoryPush).not.toHaveBeenCalled());
  // });

  // it('should display an error with login fails', async () => {
  //   apiMock.onPost('/users').reply(400);

  //   const { getByPlaceholderText, getByText } = render(<ResetPassword />);

  //   const nameField = getByPlaceholderText('Nome');
  //   const emailField = getByPlaceholderText('E-mail');
  //   const passwordField = getByPlaceholderText('Senha');
  //   const buttonElement = getByText('Cadastrar');

  //   fireEvent.change(nameField, { target: { value: 'John Doe' } });
  //   fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
  //   fireEvent.change(passwordField, { target: { value: 'secret' } });

  //   fireEvent.click(buttonElement);

  //   await waitFor(() =>
  //     expect(mockedAddToast).toHaveBeenCalledWith(
  //       expect.objectContaining({ type: 'error' }),
  //     ),
  //   );
  // });
});

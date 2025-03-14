import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from "./Login";
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import { jest } from '@jest/globals';

const postSpy = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve());

describe('Login Page', () => {
  test('should render', () => {
    render(
      <BrowserRouter>
        <Login onLogin={() => {}} />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Login');
  });

  test('should login user', async () => {
    const loginMock = jest.fn();

    postSpy.mockResolvedValue({ data: {token: 'abc123', userID: '123'} });

    render(
      <BrowserRouter>
        <Login onLogin={loginMock} />
      </BrowserRouter>
    );

    const inputUsername = screen.getByPlaceholderText('Username');
    const inputPassword = screen.getByPlaceholderText('Password');

    const submitButton = screen.getByTestId('login-btn')

    fireEvent.change(inputUsername, {
      target: { value: 'test' }
    });
    fireEvent.change(inputPassword, {
      target: { value: 'test' }
    });

    fireEvent.click(submitButton);

    const formData = {
      username: 'test',
      password: 'test',
    };

    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith(import.meta.env?.VITE_API_URL + '/api/users/login', formData);
      expect(loginMock).toHaveBeenCalled();
    });
  });

  test('should show user not found', async () => {
    const loginMock = jest.fn();

    postSpy.mockRejectedValue({ response: {status: 400, data: {message: 'User not found'}} });

    render(
      <BrowserRouter>
        <Login onLogin={loginMock} />
      </BrowserRouter>
    );

    const inputUsername = screen.getByPlaceholderText('Username');
    const inputPassword = screen.getByPlaceholderText('Password');

    const submitButton = screen.getByTestId('login-btn')

    fireEvent.change(inputUsername, {
      target: { value: 'test' }
    });
    fireEvent.change(inputPassword, {
      target: { value: 'test' }
    });

    fireEvent.click(submitButton);

    const formData = {
      username: 'test',
      password: 'test',
    };

    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith(import.meta.env?.VITE_API_URL + '/api/users/login', formData);
      expect(screen.getByText('User not found. Please register first.'));
    });
  });

  test('should show custom error', async () => {
    const loginMock = jest.fn();

    postSpy.mockRejectedValue({ response: {status: 500, data: {message: 'Error logging in'}} });

    render(
      <BrowserRouter>
        <Login onLogin={loginMock} />
      </BrowserRouter>
    );

    const inputUsername = screen.getByPlaceholderText('Username');
    const inputPassword = screen.getByPlaceholderText('Password');

    const submitButton = screen.getByTestId('login-btn')

    fireEvent.change(inputUsername, {
      target: { value: 'test' }
    });
    fireEvent.change(inputPassword, {
      target: { value: 'test' }
    });

    fireEvent.click(submitButton);

    const formData = {
      username: 'test',
      password: 'test',
    };

    await waitFor(() => {
      expect(postSpy).toHaveBeenCalledWith(import.meta.env?.VITE_API_URL + '/api/users/login', formData);
      expect(screen.getByText('Error logging in'));
    });
  });
});

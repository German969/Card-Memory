import {jest} from "@jest/globals";
import axios from "axios";
import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Register from "./Register";

const postSpy = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve());

describe('Register Page', () => {
  test('should render', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Register');
  });

  test('should register user', async () => {
    postSpy.mockResolvedValue({ data: {message: 'Success'} });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const inputUsername = screen.getByPlaceholderText('Username');
    const inputPassword = screen.getByPlaceholderText('Password');

    const submitButton = screen.getByTestId('register-btn');

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
      expect(postSpy).toHaveBeenCalledWith(import.meta.env?.VITE_API_URL + '/api/users/register', formData);
      expect(screen.getByText('Success'));
    });
  });

  test('should show error', async () => {
    postSpy.mockRejectedValue({ response: {status: 400, data: {message: 'Error registering'}} });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const inputUsername = screen.getByPlaceholderText('Username');
    const inputPassword = screen.getByPlaceholderText('Password');

    const submitButton = screen.getByTestId('register-btn');

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
      expect(postSpy).toHaveBeenCalledWith(import.meta.env?.VITE_API_URL + '/api/users/register', formData);
      expect(screen.getByText('Error registering'));
    });
  });
});

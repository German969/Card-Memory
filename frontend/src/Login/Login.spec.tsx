import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from "./Login";
import {BrowserRouter} from "react-router-dom";

describe('Login Page', () => {});
test('Load Login Page', () => {
  render(
    <BrowserRouter>
      <Login onLogin={() => {}} />
    </BrowserRouter>
  );
  //
  expect(screen.getByRole('heading')).toHaveTextContent('Login');
});

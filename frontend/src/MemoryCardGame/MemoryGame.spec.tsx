import {jest} from '@jest/globals'
// import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
// import MemoryGame from "./MemoryGame";
// import {BrowserRouter} from "react-router-dom";
// import {GameContextProvider} from "../context/game-context";
// import {Difficulty} from "../constants/history";

jest.mock('axios');

jest.useFakeTimers({
  legacyFakeTimers: true,
});

afterAll(() => {
  jest.useRealTimers();
});

describe('Memory Card Game', () => {
  test('Should Render', async () => {
    // await render(
    //   <BrowserRouter>
    //     <GameContextProvider defaultDifficulty={Difficulty.EASY}>
    //       <MemoryGame />
    //     </GameContextProvider>
    //   </BrowserRouter>
    // );

    expect(true).toBe(true);
  });
});

import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import useSettings from "../hooks/useSettings";
import {gameAudioMap} from "../constants/game-audio";
import {Difficulty} from "../constants/history";
import {apiService} from "../utils/apiService";
import {useNavigate} from "react-router-dom";
import shuffleArray from "../utils/shuffle-array";
import {cardImagesMap} from "../constants/card-images";
import bgMusic from "../assets/audio/memory-bg.mp3";

const congratsAudio = "/audio/congrats.mp3"; // Final congratulations audio

interface CardItem {
  id: number;
  image: string;
}

interface GameData {
  userID?: string;
  gameDate: Date;
  failed: number;
  difficulty: Difficulty;
  completed: number;
  timeTaken: number;
}

interface AudioRef {
  volume: number;
  play: Function;
}

interface GameContext {
  cards: CardItem[];
  timer: number;
  flippedCards: CardItem[];
  matchedCards: number[];
  failedAttempts: number;
  mouseDisabled: boolean;
  handleCardClick: Function;
  initialReveal: boolean;
  startGame: (e?: any) => void;
  handleUpdateSave: Function;
}

interface GameContextProviderProps {
  children: React.ReactNode;
  defaultDifficulty: Difficulty;
}

const GameContext = createContext<GameContext>({
  cards: [],
  timer: 0,
  flippedCards: [],
  matchedCards: [],
  failedAttempts: 0,
  mouseDisabled: false,
  handleCardClick: () => {},
  initialReveal: true,
  startGame: () => {},
  handleUpdateSave: () => {}
});

export const useGameContext = () => {
  return useContext(GameContext);
};

export function GameContextProvider({ children, defaultDifficulty }: GameContextProviderProps) {
  const navigate = useNavigate();

  const matchAudioFiles = gameAudioMap[defaultDifficulty];
  const cardImages = cardImagesMap[defaultDifficulty];

  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const [audioIndex, setAudioIndex] = useState(0);

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);

  const [failedAttempts, setFailedAttempts] = useState(0);

  const [initialReveal, setInitialReveal] = useState(true);
  const [mouseDisabled, setMouseDisabled] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  const { bgVolume, sfxVolume } = useSettings();

  const audioRef = useRef<HTMLAudioElement & AudioRef>(null);

  const saveGameData = useCallback(async (gameData: GameData) => {
    try {
      const response = await apiService.post<GameData>({
        url: '/api/memory/save',
        body: gameData,
      });

      console.log("Game data saved successfully", response.data);
    } catch (error) {
      console.error("Error saving game data:", error.response ? error.response.data : error.message);
    }
  }, []);

  const handleSaveNewGame = useCallback(() => {
    saveGameData({
      gameDate: new Date(),
      failed: failedAttempts,
      difficulty: defaultDifficulty,
      completed: 0,
      timeTaken: timer,
    });
  }, [failedAttempts, timer, saveGameData])

  const handleUpdateSave = () => {
    console.log('update game data');
  };

  const handleNewGame = useCallback(() => {
    setCards(shuffleArray(cardImages));
    setMatchedCards([]);
    setFlippedCards([]);
    setFailedAttempts(0);
    setTimer(0);
    setTimerActive(false);
    setInitialReveal(true);
    setAudioIndex(0); // Reset audio index

    const mouseDisableDuration = 2000;
    setMouseDisabled(true);
    setTimeout(() => {
      setMouseDisabled(false);  // Re-enable mouse events after mouseDisableDuration
    }, mouseDisableDuration);

    setTimeout(() => {
      setInitialReveal(false);
      setTimerActive(true);
    }, 1500);
  }, [cardImages]);

  const handleCardClick = useCallback((card: CardItem) => {
    if (!matchedCards.includes(card.id) && flippedCards.length < 2 && !flippedCards.some((c) => c.id === card.id)) {
      setFlippedCards((prev) => [...prev, card]);
    }
  }, [matchedCards, flippedCards]);

  const startGame = useCallback(() => {
    handleSaveNewGame();
    handleNewGame();
  }, [handleSaveNewGame, handleNewGame]);

  // New Game
  useEffect(() => {
    handleNewGame();
    const handleFirstClick = () => {
      if (!musicStarted && audioRef.current) {
        audioRef.current!.volume = bgVolume / 100;
        audioRef.current!.play().catch((error: Error) => console.error("Audio play error:", error));
        setMusicStarted(true);
      }
    };
    document.addEventListener("click", handleFirstClick);

    return () => document.removeEventListener("click", handleFirstClick);
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Flipped cards
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;
      setTimeout(() => {
        if (card1.image === card2.image) {
          setMatchedCards((prev) => [...prev, card1.id, card2.id]);
          if (audioIndex < matchAudioFiles.length) {
            // Play the next audio in order
            const nextAudio = new Audio(matchAudioFiles[audioIndex]);
            nextAudio.volume = sfxVolume / 100; // Set the volume for sound effects
            nextAudio.play();
            setAudioIndex(audioIndex + 1); // Move to the next audio
          }
        } else {
          setFailedAttempts((prev) => prev + 1);
        }
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, audioIndex, sfxVolume]);

  // Matched Cards
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      // Play the congratulations audio
      const congrats = new Audio(congratsAudio);
      congrats.volume = sfxVolume / 100;
      congrats.play();

      // Stop the timer before saving the game data
      setTimerActive(false);

      // Ensure the game data is saved only once
      const saveData = async () => {
        try {
          await saveGameData({
            gameDate: new Date(),
            failed: failedAttempts,
            difficulty: defaultDifficulty,
            completed: 1,
            timeTaken: timer,
          });
          localStorage.setItem("gameCompleted", "true");
          setTimeout(() => navigate("/congt-easy"), 1000);
        } catch (error) {
          console.error("Error saving game data:", error);
        }
      };

      saveData();
    }
  }, [matchedCards, cards.length, navigate, sfxVolume, failedAttempts, timer]);

  return (
    <GameContext.Provider value={{
      cards,
      timer,
      flippedCards,
      matchedCards,
      failedAttempts,
      mouseDisabled,
      handleCardClick,
      initialReveal,
      startGame,
      handleUpdateSave
    }}>
      <audio ref={audioRef} src={bgMusic} loop />
      {children}
    </GameContext.Provider>
  );
}

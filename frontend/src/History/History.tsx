import calmBackground from "../assets/images/calm-wallpaper.jpg";
import backgroundGif from "../assets/images/play.gif";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import buttonHoverSound from "../assets/audio/button-hover.mp3";
import {apiService} from "../utils/apiService";
import {Difficulty} from "../constants/history";
import moment from "moment";
import "./History.css";

interface HoverAudioRef {
  currentTime: number;
  volume: number;
  play: Function;
}

interface SavedGame {
  completed: number;
  difficulty: Difficulty;
  failed: number;
  gameDate: Date;
  timeTaken: number;
  userID: string;
  _id: string;
}

const History = () => {
  const navigate = useNavigate();

  const [gameHistory, setGameHistory] = useState<SavedGame[]>([]);

  const [isCalmMode, setIsCalmMode] = useState(false);

  const [sfxVolume, setSfxVolume] = useState(
    localStorage.getItem("sfxVolume") !== null
      ? parseInt(localStorage.getItem("sfxVolume") as string, 10)
      : 50
  );

  const hoverAudioRef = useRef<HoverAudioRef | null>(null);

  const playHoverSound = () => {
    hoverAudioRef.current!.currentTime = 0;
    hoverAudioRef.current!.play().catch((error: Error) =>
      console.error("Hover sound playback failed:", error)
    );
  };

  useEffect(() => {
    hoverAudioRef.current = new Audio(buttonHoverSound);
  }, []);

  useEffect(() => {
    hoverAudioRef.current!.volume = sfxVolume / 100;
    localStorage.setItem("sfxVolume", sfxVolume.toString());
  }, [sfxVolume]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await apiService.get({
          url: '/api/memory/history'
        });

        setGameHistory(result.data);
      } catch (error) {
        console.error("Error fetching game history:", error.response ? error.response.data : error.message);
        if (error.response?.status === 403) {
          navigate('/login');
        }
      }
    };

    fetchHistory();
  }, []);

  /*
    completed: 1
    difficulty: "Easy"
    failed: 0
    gameDate: "2025-03-12T17:08:11.775Z"
    timeTaken: 4
    userID: "67d1be9f74cd4587a74440e7"
    _id: "67d1bf7b74cd4587a74440eb"
 */

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${isCalmMode ? calmBackground : backgroundGif})`,
      }}
    >
      <h1 className={`game-title ${isCalmMode ? "calm-title" : ""}`}>
        Game History
      </h1>

      <table className="history-container" style={{
        backgroundColor: isCalmMode ? "#86a17d" : "#1e1e2e",
        color: isCalmMode ? "#ffffff" : "#fff",
      }}>
        <thead>
          <tr className="history-item">
            <th>#</th>
            <th>Date</th>
            <th>Difficulty</th>
            <th>Completed</th>
            <th>Failed Attempts</th>
            <th>Time Taken</th>
          </tr>
        </thead>
        <tbody className="history-data">
        {gameHistory.map((historyItem, index) => {
          return (
            <tr className="history-item" key={historyItem._id}>
              <td>{index}</td>
              <td>{moment(historyItem.gameDate).format('DD/MM/YYYY')}</td>
              <td>{historyItem.difficulty}</td>
              <td>{historyItem.completed === 1 ? 'Yes' : 'No'}</td>
              <td>{historyItem.failed}</td>
              <td>{historyItem.timeTaken} seconds</td>
            </tr>
          );
        })}
        </tbody>
      </table>

      <div className="button-container">
        <button
          className={`game-button ${isCalmMode ? "calm-button" : ""}`}
          onClick={() => navigate('/play')}
          onMouseEnter={playHoverSound}
        >
          Return To Home
        </button>
      </div>
    </div>
  );
};

export default History;

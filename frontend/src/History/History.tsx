import calmBackground from "../assets/images/calm-wallpaper.jpg";
import backgroundGif from "../assets/images/play.gif";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {apiService} from "../utils/apiService";
import {Difficulty} from "../constants/history";
import moment from "moment";
import "./History.css";
import useSettings from "../hooks/useSettings";

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

  const {
    isCalmMode,
    playHoverSound,
  } = useSettings();

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

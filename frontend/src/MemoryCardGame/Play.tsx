import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";
import backgroundGif from "../assets/images/play.gif";
import calmBackground from "../assets/images/calm-wallpaper.jpg";
import {X} from "lucide-react";
import "./Play.css";
import useSettings from "../hooks/useSettings";
import {Difficulty} from "../constants/history";

const modalStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    backgroundColor: "#1e1e2e",
    border: "2px solid #4a4e69",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "600px",
    height: "300px",
    width: "90%",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  },
};

const modalPlayStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  content: {
    backgroundColor: "#1e1e2e",
    border: "2px solid #4a4e69",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "600px",
    height: "200px",
    width: "90%",
    color: "#fff",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  },
};

const Play = () => {
  const navigate = useNavigate();
  const [SettingsModalIsOpen, setModalSettingIsOpen] = useState(false);
  const [PlayModalIsOpen, setModalPlayIsOpen] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);

  const {
    isCalmMode,
    mutedBg,
    mutedSfx,
    bgVolume,
    sfxVolume,
    playClickSound,
    playHoverSound,
    handleBgVolumeChange,
    handleSfxVolumeChange
  } = useSettings();

  const SettingopenModal = () => {
    setModalSettingIsOpen(true);
    playClickSound();
  };

  const SettingcloseModal = () => {
    setModalSettingIsOpen(false);
    playClickSound();
  };

  const PlayopenModal = () => {
    playClickSound();
    setModalPlayIsOpen(true);
  };

  const PlaycloseModal = () => {
    playClickSound();
    setModalPlayIsOpen(false);
  };

  const handleDifficultySelect = (level: Difficulty) => {
    setDifficulty(level);
  };

  const handlePlay = () => {
    playClickSound();
    const userID = localStorage.getItem("userID");
    if (!userID) {
      alert("UserID is missing. Please log in again.");
      return;
    }
    localStorage.setItem("gameStarted", "true");

    if (isCalmMode) {
      if (difficulty === Difficulty.HARD) {
        navigate("/calm-hard");
      } else if (difficulty === Difficulty.NORMAL) {
        navigate("/calm-medium");
      } else if (difficulty === Difficulty.EASY) {
        navigate("/calm-easy");
      } else {
        alert('Please select a difficulty');
      }
    } else {
      if (difficulty === Difficulty.HARD) {
        navigate("/memory-card-game");
      } else if (difficulty === Difficulty.NORMAL) {
        navigate("/medium");
      } else if (difficulty === Difficulty.EASY) {
        navigate("/easy");
      } else {
        alert('Please select a difficulty');
      }
    }
  };

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${isCalmMode ? calmBackground : backgroundGif})`,
      }}
    >
      <h1 className={`game-title ${isCalmMode ? "calm-title" : ""}`}>
        WonderCards
      </h1>

      <div className="button-container">
        <button
          className={`game-button ${isCalmMode ? "calm-button" : ""}`}
          onClick={PlayopenModal}
          onMouseEnter={playHoverSound}
        >
          Play
        </button>
        <button
          className={`game-button ${isCalmMode ? "calm-button" : ""}`}
          onClick={() => navigate('/history')}
          onMouseEnter={playHoverSound}
        >
          History
        </button>
        <button
          className={`game-button ${isCalmMode ? "calm-button" : ""}`}
          onClick={() => {
            playClickSound();
            alert("Instructions coming soon!");
          }}
          onMouseEnter={playHoverSound}
        >
          Instructions
        </button>
        <button
          className={`game-button ${isCalmMode ? "calm-button" : ""}`}
          onClick={SettingopenModal}
          onMouseEnter={playHoverSound}
        >
          Settings
        </button>
      </div>
      <Modal
        isOpen={SettingsModalIsOpen}
        onRequestClose={SettingcloseModal}
        style={{
          ...modalStyles,
          content: {
            ...modalStyles.content,
            backgroundColor: isCalmMode ? "#86a17d" : "#1e1e2e",
            color: isCalmMode ? "#ffffff" : "#fff",
          } as any,
        }}
      >
        <button
          onClick={SettingcloseModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <X size={24} />
        </button>

        <h2 className={`${isCalmMode ? "calm-mode-label" : ""} modal-h2`}>
          Background Music
        </h2>
        <div className="volume-control">
          <span className="volume-icon">{mutedBg ? "🔇" : "🔊"}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={bgVolume}
            onChange={handleBgVolumeChange}
            className="volume-slider"
          />
        </div>

        <h2 className={`${isCalmMode ? "calm-mode-label" : ""} modal-h2`}>
          Sound Effects
        </h2>
        <div className="volume-control">
          <span className="volume-icon">{mutedSfx ? "🔇" : "🔊"}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={sfxVolume}
            onChange={handleSfxVolumeChange}
            className="volume-slider"
          />
        </div>

        {/* <div className="calm-mode">
          <h2 className={`${isCalmMode ? "calm-mode-label" : ""} modal-h2`}>
            Calm Mode
          </h2>
          <label className="switch">
            <input
              type="checkbox"
              checked={isCalmMode}
              onChange={toggleCalmMode}
            />
            <span className="slider round"></span>
          </label>
        </div> */}
      </Modal>

      <Modal
        isOpen={PlayModalIsOpen}
        onRequestClose={PlaycloseModal}
        style={{
          ...modalPlayStyles,
          content: {
            ...modalPlayStyles.content,
            backgroundColor: isCalmMode ? "#86a17d" : "#1e1e2e",
            color: isCalmMode ? "#ffffff" : "#fff",
          } as any,
        }}
      >
        <button
          onClick={PlaycloseModal}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
          }}
        >
          <X size={24} />
        </button>

        <h2 className={`${isCalmMode ? "calm-mode-label" : ""} modal-h2`}>
          Select Difficulty
        </h2>
        <div className="difficulty-selection">
          <button
            onClick={() => {
              handleDifficultySelect(Difficulty.EASY);
              playClickSound();
            }}
            className={`difficulty-button green ${
              difficulty === Difficulty.EASY && !isCalmMode ? "selected" : ""
            } ${isCalmMode && difficulty === Difficulty.EASY ? "calm-selected" : ""}`}
            onMouseEnter={playHoverSound}
          >
            Easy
          </button>
          <button
            onClick={() => {
              handleDifficultySelect(Difficulty.NORMAL);
              playClickSound();
            }}
            className={`difficulty-button yellow ${
              difficulty === Difficulty.NORMAL && !isCalmMode ? "selected" : ""
            } ${isCalmMode && difficulty === Difficulty.NORMAL ? "calm-selected" : ""}`}
            onMouseEnter={playHoverSound}
          >
            Normal
          </button>
          <button
            onClick={() => {
              handleDifficultySelect(Difficulty.HARD);
              playClickSound();
            }}
            className={`difficulty-button red ${
              difficulty === Difficulty.HARD && !isCalmMode ? "selected" : ""
            } ${isCalmMode && difficulty === Difficulty.HARD ? "calm-selected" : ""}`}
            onMouseEnter={playHoverSound}
          >
            Hard
          </button>
        </div>

        <div>
          <button
            onClick={handlePlay}
            className="play-button"
            onMouseEnter={playHoverSound}
          >
            Accept
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Play;

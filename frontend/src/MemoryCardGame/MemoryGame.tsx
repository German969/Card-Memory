import React, { useState } from "react";
import {Box, Grid, Button, Modal, Typography} from "@mui/material";
import { styled } from "@mui/system";
import background from "../assets/images/mode1.gif";
import Card from "./Card";
import Timer from "./Timer";
import {useGameContext} from "../context/game-context";
import {useNavigate} from "react-router-dom";

interface GameContainerProps {
  mouseDisabled: boolean;
}

// Styled Components
const StyledGameContainer = styled(Box)(({ mouseDisabled }: GameContainerProps) => ({
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  position: "relative",
  pointerEvents: mouseDisabled ? "none" : "auto",
}));

const PixelButton = styled(Box)(({ theme }) => ({
  display: "inline-block",
  backgroundColor: "#2c2c54",
  color: "#fff",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "14px",
  padding: "15px 30px",
  border: "2px solid #00d9ff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  textAlign: "center",
  transition: "transform 0.2s, background-color 0.2s, box-shadow 0.2s",

  "&:hover": {
    backgroundColor: "#40407a",
    borderColor: "#00aaff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const PixelBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "10%",
  left: "1%",
  backgroundColor: "#ff4d4f",
  color: "#fff",
  padding: "10px 20px",
  border: "2px solid #00d9ff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "12px",
  textAlign: "center",
  marginBottom: "10px",
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#2c2c54',  // Matching the game's background color
  border: '2px solid #00d9ff', // Matching the pixel border
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Subtle shadow for pixel look
  padding: '20px',
  textAlign: 'center',
  borderRadius: '10px', // Pixel rounded corners
};

const PixelTypography = styled(Typography)(({ theme }) => ({
  fontFamily: '"Press Start 2P", cursive', // Pixelated font style
  fontSize: '24px',
  color: '#fff',  // White text to stand out on the background
  letterSpacing: '1px',
  textShadow: `
    -1px -1px 0 #ff0000,  
    1px -1px 0 #ff7f00, 
    1px 1px 0 #ffd700, 
    -1px 1px 0 #ff4500`,  // Pixelated text shadow
}));

const PixelButtonModal = styled(Button)(({ theme }) => ({
  backgroundColor: "#2c2c54",
  color: "#fff",
  fontFamily: '"Press Start 2P", cursive', // Pixelated font style
  fontSize: "14px",
  padding: "15px 30px",
  border: "2px solid #00d9ff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  cursor: "pointer",
  textAlign: "center",
  transition: "transform 0.2s, background-color 0.2s, box-shadow 0.2s",
  "&:hover": {
    backgroundColor: "#40407a",
    borderColor: "#00aaff",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.4)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const MemoryGame = () => {
  const {
    cards,
    flippedCards,
    matchedCards,
    failedAttempts,
    mouseDisabled,
    handleCardClick,
    initialReveal,
    startGame,
    handleUpdateSave
  } = useGameContext();

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const handleBackButton = () => {
    setOpenModal(true); // Show the confirmation modal
  };

  const handleModalYes = () => {
    handleUpdateSave();
    setOpenModal(false);
    localStorage.removeItem("gameCompleted"); // Remove game completion flag
    navigate("/play"); // Navigate to play
  };

  const handleModalNo = () => {
    setOpenModal(false); // Close the modal and resume game
  };

  const userID = localStorage.getItem("userID"); // ✅ Fetch from local storage or auth context
  if (!userID) {
    console.error("Error: userID is missing.");
    navigate("/login");
  }

  const gridContainerStylesMap = {
    [4]: {
      styles: {
        maxWidth: 600,
        marginTop: "-80px"
      },
      spacing: 6,
      size: 6
    },
    [6]: {
      styles: {
        maxWidth: 700,
        marginTop: "-50px"
      },
      spacing: 10,
      size: 4
    },
    [12]: {
      styles: {
        maxWidth: 900,
        marginTop: "-120px"
      },
      spacing: 8,
      size: 3
    }
  };

  const gridStyles = gridContainerStylesMap[cards.length || 4];

  return (
    <StyledGameContainer mouseDisabled={mouseDisabled}>
      <PixelButton onClick={handleBackButton} sx={{ alignSelf: "flex-start", margin: 2 }}>
        Back
      </PixelButton>
      <Timer />
      <PixelBox>Learning Moments: {failedAttempts}</PixelBox>
      <Grid container spacing={gridStyles.spacing} justifyContent="center" sx={gridStyles.styles}>
        {cards.map((card) => (
          <Grid item xs={gridStyles.size} key={card.id}> {/* Changed from xs={3} to xs={6} for 2 cards per row */}
            <Card
              card={card}
              handleClick={() => handleCardClick(card)}
              flipped={
                initialReveal ||
                flippedCards.some((c) => c.id === card.id) ||
                matchedCards.includes(card.id)
              }
              matched={matchedCards.includes(card.id)}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 2, textAlign: "center" }}>

        <PixelButton onClick={startGame} sx={{ mt: 2}}>
          New Game
        </PixelButton>
      </Box>


      <Modal open={openModal} onClose={handleModalNo}>
        <Box sx={modalStyle}>
          <PixelTypography variant="h6">
            Are you sure you want to go back to the play page?
          </PixelTypography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 2 }}>
            <PixelButtonModal onClick={handleModalYes} variant="contained" color="primary">
              Yes
            </PixelButtonModal>
            <PixelButtonModal onClick={handleModalNo} variant="contained" color="secondary">
              No
            </PixelButtonModal>
          </Box>
        </Box>
      </Modal>
    </StyledGameContainer>
  );
};

export default MemoryGame;

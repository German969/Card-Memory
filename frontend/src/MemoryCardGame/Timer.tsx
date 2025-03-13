import React from "react";
import {styled} from "@mui/system";
import {Box} from "@mui/material";
import {useGameContext} from "../context/game-context";

const PixelTimerBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: "5%",
  left: "1%",
  backgroundColor: "#2c2c54",
  color: "#fff",
  padding: "10px 20px",
  border: "2px solid #00d9ff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  fontFamily: '"Press Start 2P", cursive',
  fontSize: "12px",
  textAlign: "center",
}));

const Timer = () => {
  const { timer } = useGameContext();

  return (
    <PixelTimerBox>Timer: {timer}s</PixelTimerBox>
  );
};

export default Timer

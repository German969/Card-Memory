import React from "react";
import {styled} from "@mui/system";
import {Box} from "@mui/material";
import {useGameContext} from "../context/game-context";

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

const FailedAttempts = () => {
  const { failedAttempts } = useGameContext();

  return (
    <PixelBox>Learning Moments: {failedAttempts}</PixelBox>
  );
};

export default FailedAttempts;

import {animated, useSpring} from "@react-spring/web";
import PropTypes from "prop-types";
import React from "react";
import {styled} from "@mui/system";
import {Box} from "@mui/material";

const CardContainer = styled(Box)({
  perspective: "1000px",
  cursor: "pointer",
  width: "220px",
  height: "220px",
});

const SmallCardContainer = styled(Box)({
  perspective: "1000px",
  cursor: "pointer",
  width: "130px",
  height: "130px",
})

const CardInner = styled(animated.div)({
  position: "relative",
  width: "100%",
  height: "100%",
  transformStyle: "preserve-3d",
  transition: "transform 0.6s",
});

const CardFront = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "80%",
  height: "80%",
  backfaceVisibility: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "#1b1f34",
  // border: "2px solid #4c5c77",
  borderRadius: "8px",
  transform: "rotateY(180deg)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
});

const CardBack = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "90%",
  height: "90%",
  backfaceVisibility: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // backgroundColor: "#2c2c54",
  // border: "2px solid #00aaff",
  borderRadius: "8px",
  transform: "rotateY(0deg)",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
});

interface CardProps {
  card: {
    id: number;
    image: string;
  };
  handleClick: (e: any) => void,
  flipped: boolean,
  matched: boolean,
  small: boolean;
}

const Card = ({ card, handleClick, flipped, matched, small = false }: CardProps) => {
  const { transform } = useSpring({
    transform: flipped || matched ? "rotateY(180deg)" : "rotateY(0deg)",
    config: { tension: 500, friction: 30 },
  });

  if (small) {
    return (
      <SmallCardContainer onClick={handleClick} data-testid="card-container">
        <CardInner style={{ transform }}>
          <CardFront>
            <img src={card.image} alt="Card front" style={{ width: "140%", height: "140%" }} />
          </CardFront>
          <CardBack>
            <img src="/images/Back2.png" alt="Card back" style={{ width: "120%", height: "120%" }} />
          </CardBack>
        </CardInner>
      </SmallCardContainer>
    );
  }

  return (
    <CardContainer onClick={handleClick} data-testid="card-container">
      <CardInner style={{ transform }}>
        <CardFront>
          <img src={card.image} alt="Card front" style={{ width: "140%", height: "140%" }} />
        </CardFront>
        <CardBack>
          <img src="/images/Back2.png" alt="Card back" style={{ width: "120%", height: "120%" }} />
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  matched: PropTypes.bool.isRequired,
};

export default Card;

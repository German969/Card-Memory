import {Difficulty} from "./history";

export const easyCardImages = [
  { id: 1, image: "/images/meteor.png" },
  { id: 2, image: "/images/meteor.png" },
  { id: 3, image: "/images/comet.png" },
  { id: 4, image: "/images/comet.png" },
];

export const mediumCardImages = [
  { id: 1, image: "/images/meteor.png" },
  { id: 2, image: "/images/meteor.png" },
  { id: 3, image: "/images/moon.png" },
  { id: 4, image: "/images/moon.png" },
  { id: 5, image: "/images/comet.png" },
  { id: 6, image: "/images/comet.png" },
];

export const hardCardImages = [
  { id: 1, image: "/images/earth.png" },
  { id: 2, image: "/images/earth.png" },
  { id: 3, image: "/images/jupiter.png" },
  { id: 4, image: "/images/jupiter.png" },
  { id: 5, image: "/images/mars.png" },
  { id: 6, image: "/images/mars.png" },
  { id: 7, image: "/images/mercury.png" },
  { id: 8, image: "/images/mercury.png" },
  { id: 9, image: "/images/neptune.png" },
  { id: 10, image: "/images/neptune.png" },
  { id: 11, image: "/images/saturn.png" },
  { id: 12, image: "/images/saturn.png" },
];

export const cardImagesMap = {
  [Difficulty.EASY]: easyCardImages,
  [Difficulty.NORMAL]: mediumCardImages,
  [Difficulty.HARD]: hardCardImages,
};

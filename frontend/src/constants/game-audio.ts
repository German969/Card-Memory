import {Difficulty} from "./history";

export const easyAudioFiles = [
  "/audio/wonderful.mp3",
];

export const mediumAudioFiles = [
  "/audio/wonderful.mp3",
  "/audio/NiceJob.mp3",
];

export const hardAudioFiles = [
  "/audio/wonderful.mp3",
  "/audio/NiceJob.mp3",
  "/audio/Greatwork.mp3",
  "/audio/KeepItGoing.mp3",
  "/audio/Amazing.mp3",
];

export const gameAudioMap = {
  [Difficulty.EASY]: easyAudioFiles,
  [Difficulty.NORMAL]: mediumAudioFiles,
  [Difficulty.HARD]: hardAudioFiles,
};

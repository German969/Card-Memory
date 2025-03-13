import type {Config} from 'jest';
// @ts-ignore
import dotenv from "dotenv";

dotenv.config({ path: './src/config/.env' });

const config: Config = {
  "preset": "ts-jest",
  testEnvironment: "node",
};

export default config;

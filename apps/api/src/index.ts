import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import winston from "winston";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const app = express()

app.use(helmet())

const logger = winston.createLogger({
  // Log only if level is less than (meaning more severe) or equal to this
  level: "info",
  // Use timestamp and printf to create a standard log format
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.json(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  // Log to the console and a file
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/api.log" }),
  ],
});

app.use((req, _, next) => {
  // Log an info message for each incoming request
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});

app.get("/", (_, res) => {
  res.send("It works!")
})

const { PORT } = process.env

app.listen(PORT, () => {
  logger.log("info", `🚀 Api listening on port ${PORT}!`);
})

export const api = app


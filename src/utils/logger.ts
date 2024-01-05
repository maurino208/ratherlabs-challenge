import logger from "pino";

export default logger({
  name: "challenge-rather",
  level: process.env.PINO_LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
  },
  timestamp: logger.stdTimeFunctions.isoTime
});

import logger from "pino";
import pinoPretty from "pino-pretty";

export default logger({
  name: "challenge-rather",
  level: "debug",
  transport: {
    target: "pino-pretty",
    options: {
      translateTyme: true,
      ignore: "pid.hostname"
    }
  }
});
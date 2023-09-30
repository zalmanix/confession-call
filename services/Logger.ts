/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger as reactNativeLogs, consoleTransport } from "react-native-logs";

const config = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: __DEV__ ? "debug" : "error",
  transport: consoleTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
    extensionColors: {
      ["ClientService"]: "magenta",
      ["ServerService"]: "green",
      ["BLEService"]: "cyan",
      ["StorageService"]: "redBright",
      ["FirebaseService"]: "yellowBright",
      ["API"]: "whiteBright",
    },
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  enabled: true,
};

type levelLogMethodType = (...msgs: any[]) => void;

interface LoggerType {
  error: levelLogMethodType;
  debug: levelLogMethodType;
  info: levelLogMethodType;
}

interface ExtendedLoggerType extends LoggerType {
  extend: (extension: string) => LoggerType;
}

const logger = reactNativeLogs.createLogger(config) as any as ExtendedLoggerType;
export class LoggerService implements LoggerType {
  logger: LoggerType;
  extension?: string;

  constructor(extension?: string) {
    if (extension) {
      this.extension = extension;
      this.logger = logger.extend(extension);
    } else {
      this.logger = logger;
    }
  }

  public error(...msgs: any[]): void {
    this.logger.error(msgs);
    const message = msgs[0] as string;
    // crashlytics().log(`${this.extension ?? "DEFAULT"} | ERROR | ${message}`);
  }

  public info(...msgs: any[]): void {
    this.logger.info(msgs);
    const message = msgs[0] as string;
    // crashlytics().log(`${this.extension ?? "DEFAULT"} | INFO | ${message}`);
  }

  public debug(...msgs: any[]): void {
    this.logger.debug(msgs);
    const message = msgs[0] as string;
    // crashlytics().log(`${this.extension ?? "DEFAULT"} | DEBUG | ${message}`);
  }
}

export const Logger = new LoggerService();

import { createLogger, format, transports } from 'winston';
import path from 'path';

const logsPath = path.resolve('logs');
const errorFile = logsPath + '\\error.log';
const infoFile = logsPath + '\\combined.log';

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json(), format.prettyPrint()),
  transports: [
    new transports.File({ filename: errorFile, level: 'error' }), // - Write all logs with importance level of `error` or less to `error.log`
    new transports.File({ filename: infoFile }), // - Write all logs  to `combined.log`
    new transports.Console({ format: format.simple() }),
  ],
});

// logger.error({message: 'mensaje'});
// logger.warn({message: 'mensaje'});
// logger.info({message: 'mensaje'});
// logger.http({message: 'mensaje'});
// logger.vebose({message: 'mensaje'});
// logger.debug({message: 'mensaje'});
// logger.silly({message: 'mensaje'});

export default logger;

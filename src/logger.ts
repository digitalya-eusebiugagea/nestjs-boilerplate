import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike('Nest'),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;

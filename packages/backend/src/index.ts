import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { watcherRouter } from './routes/watchlist';
import { watcher } from './watcher';
import { config } from './config';
import logger from './utils/logger';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/watchlist', watcherRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(config.port, () => {
  logger.info(`Server running at http://localhost:${config.port}`);
});

setInterval(async () => {
  await watcher.checkAndUpdateWatchlist();
  logger.info('Watchlist updated');
}, config.updateInterval);

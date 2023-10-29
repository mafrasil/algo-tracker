import { Router, Request, Response } from 'express';
import { watcher } from '../watcher';
import { validateAddress } from '../utils/validator';

const router = Router();

router.get('', (req: Request, res: Response) => {
  const watchlist = watcher.getWatchlist();
  res.status(200).json(watchlist);
});

router.post('', validateAddress, async (req: Request, res: Response) => {
  try {
    await watcher.addToWatchlist(req.body.address);
    res.status(200).json({ message: 'Address added to the watchlist' });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

router.delete('', validateAddress, async (req: Request, res: Response) => {
    try {
        await watcher.deleteFromWatchlist(req.body.address);
        res.status(200).json({ message: 'Address removed from the watchlist' });
    } catch (error) {
        res.status(400).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

router.get('/activity', (req: Request, res: Response) => {
  const notifications = watcher.getNotifications();
  res.status(200).json(notifications);
});

export const watcherRouter = router;

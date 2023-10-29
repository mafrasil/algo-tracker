import { watcher } from '../watcher';

describe('watchlist', () => {
  it('should add an address to the watchlist', async () => {
    const address = 'XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEPA';
    await watcher.addToWatchlist(address);
    const watchlist = watcher.getWatchlist();
    const addresses = watchlist.map(account => account.address);
    expect(addresses).toContain(address);
  });

  it('should throw an error when trying to add an invalid address to the watchlist', async () => {
    const address = 'XBYLS2E6YI6XXL5BWCAMOA4GTWHXWENZMX5UHXMRNWWUQ7BXCY5WC5TEP'; // 1 character missing
    await expect(watcher.addToWatchlist(address)).rejects.toThrow('Invalid address');
  });
});

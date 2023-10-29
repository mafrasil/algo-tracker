import algosdk from 'algosdk';
import dayjs from 'dayjs';
import { config } from '../config';
import logger from '../utils/logger';

const client = new algosdk.Algodv2("", config.algorandApiEndpoint, 443);

interface Account {
  address: string;
  balance: number;
  totalAppsOptedIn: number;
  totalAssetsOptedIn: number;
  totalCreatedApps: number;
  totalCreatedAssets: number;
  created: string;
  updated: string;
}

const watchlist: Account[] = [];
const notifications: string[] = [];

export const watcher = {
  getWatchlist: () => watchlist,
  getNotifications: () => notifications,
  addToWatchlist: async (address: string) => {
    if (!algosdk.isValidAddress(address)) {
      throw new Error('Invalid address');
    }
    if (watchlist.some(account => account.address === address)) {
      throw new Error('Address already in the watchlist');
    }
    const accountInfo = await client.accountInformation(address).do();
    const account: Account = {
      address,
      balance: accountInfo.amount,
      totalAppsOptedIn: accountInfo['total-apps-opted-in'],
      totalAssetsOptedIn: accountInfo['total-assets-opted-in'],
      totalCreatedApps: accountInfo['total-created-apps'],
      totalCreatedAssets: accountInfo['total-created-assets'],
      created: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updated: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    watchlist.push(account);
  },
  deleteFromWatchlist: async (address: string) => {
    if (!algosdk.isValidAddress(address)) {
      throw new Error('Invalid address');
    }
    const index = watchlist.findIndex(account => account.address === address);
    if (index !== -1) {
      watchlist.splice(index, 1);
    } else {
      throw new Error('Address not found in the watchlist');
    }
  },
  checkAndUpdateWatchlist: async () => {
    for (const account of watchlist) {
      try {
        const updatedAccountInfo = await client.accountInformation(account.address).do();
        let hasChanges = false;
         
        const keyMapping = {
          amount: 'balance',
        };
        
        for (const [apiKey, accountKey] of Object.entries(keyMapping)) {
          const updatedValue = updatedAccountInfo[apiKey];
          if (account[accountKey] !== updatedValue) {
            console.log(`Change detected for ${accountKey} on address ${account.address}. Old value: ${account[accountKey]}, New value: ${updatedValue}`);
            notifications.push(`Change detected for ${accountKey} on address ${account.address}. Old value: ${account[accountKey]}, New value: ${updatedValue}`);
            account[accountKey] = updatedValue;
            account.updated = dayjs().format("YYYY-MM-DD HH:mm:ss");
            hasChanges = true;
          }
        }
        if (hasChanges) {
          logger.info(`Changes detected for address ${account.address}`);
        } else {
          logger.info(`No changes detected for address ${account.address}`);
        }
      } catch (error) {
        if (error instanceof Error) {
          logger.error(`Error checking account ${account.address}: ${error.message}`);
        } else {
          logger.error(`Error checking account ${account.address}:`, error);
        }
      }
    }
  }
  
};
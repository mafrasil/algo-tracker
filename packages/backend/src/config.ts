import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  updateInterval: process.env.UPDATE_INTERVAL ? parseInt(process.env.UPDATE_INTERVAL, 10) : 60000,
  algorandApiEndpoint: process.env.ALGORAND_API_ENDPOINT || 'https://testnet-api.algonode.cloud',
};

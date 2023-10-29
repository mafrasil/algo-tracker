# Algorand Tracker Backend

This package contains the backend service for the Algo Tracker.

## Features
- Add Algorand addresses to a watcher list.
- Periodically check the state of each account in the watcher list.
- Log notifications when a change in the balance or assets/apps of a watched account is detected.
- Provide an API to list all tracked accounts and their states.

## Technology Stack
- Express.js
- TypeScript
- Axios for HTTP requests
- Jest for testing

## Getting Started

### Prerequisites
- Node.js
- pnpm or Yarn

### Usage
To start the development server:

```
yarn dev
```

## Testing
To run tests:

```
yarn test
```

## Considerations and Risks

### In-Memory Storage
In the current implementation, the watchlist is stored in-memory. This approach is simple and fast but has several drawbacks:

- Persistence: If the server restarts, we will lose all the stored data.
- Scalability: As the watchlist grows, it will consume more server memory, which could lead to performance issues.

For a more robust and scalable solution, it’s recommended to use a database to store the watchlist and account states.

### Periodic State Check
The account states are checked periodically using a setInterval function on the frontend. This is a simple solution but it has its limitations:

- Reliability: If the user closes the browser or navigates away from the page, the state checks will stop.
- Scalability: If many users are using the application simultaneously, the Algorand node could get overwhelmed with requests.

An alternative approach would be to handle the periodic state checks on the server-side using a task scheduler like node-cron. This would ensure the state checks continue running even if no users are currently accessing the application.

However, for simplicity and ease of deployment, this server-side scheduling is not implemented in the current version of the project. If you wish to implement this, one solution could be to use a cron job service like cron-job.org to trigger an endpoint in the API at regular intervals.

## API Endpoints
The backend service provides a variety of API endpoints to interact with the Algo Tracker:

`POST /api/watchlist`

Add an Algorand address to the watcher list.

**Request Body:**
```
{
  "address": "your-algorand-address"
}
```

`GET /api/watchlist`

Get a list of all tracked Algorand accounts and their states.

`DELETE /api/watchlist`

Delete an Algorand address to the watcher list.

**Request Body:**
```
{
  "address": "your-algorand-address"
}
```

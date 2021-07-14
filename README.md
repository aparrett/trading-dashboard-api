# Trading Dashboard

## Local Installation

1. Clone project

```
git clone https://github.com/aparrett/trading-dashboard-api.git
```

2. cd into folder

```
cd trading-dashboard-api
```

3. Download npm packages

```
yarn
```

4. Start PostgreSQL server

5. Create database called `trading_dashboard` (from outside psql command line utility)

```
createdb trading_dashboard
```

6. Add a user with the username `postgres` and password `admin`. You can choose your own username and password but be sure to specify them in the .env file.

7. Connect to the database with psql and add the uuid extension:

```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

8. Install Redis

```
brew install redis
```

9. Start Redis

```
brew services start redis
```

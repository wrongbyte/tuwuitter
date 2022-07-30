## How to run
### 1 - Install the dependencies
```
yarn install
```
Run the client:
```
yarn workspace @tuwuitter/client start
```
Add the .env file in the server repository, following `.env.example`

Run the Redis instance:
```
docker-compose up -d
```

Run the server:
```
yarn workspace @tuwuitter/server dev
```
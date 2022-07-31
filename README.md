![preview](https://user-images.githubusercontent.com/57643375/182004479-b71eb6b3-d21d-44be-a041-c4ad38d8b830.png)

## WORK IN PROGRESS

### How to run

Install the dependencies
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

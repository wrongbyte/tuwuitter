## Tuwuitter - a Twitter clone made with GraphQL + Relay

⚠️ this code needs a lot of refac, and I plan to do so in the future

This is a study project in continuous development, in which I am implementing features from Twitter - such as a real-time timeline, user profiles and tweets - using the Relay stack. Feel free to open a PR anytime!

This project has a deployment in heroku, you can see it live [here.](https://tuwuitter.herokuapp.com/login)

## Technologies used:
- Language: Typescript
- Server: Koa
- Database: MongoDB
- GraphQL middleware: GraphQL-helix
- Graphql library to implement subscriptions: Graphql-ws
- React (frontend components)
- Relay (frontend framework and server specification)


![user profile preview](https://user-images.githubusercontent.com/57643375/182004479-b71eb6b3-d21d-44be-a041-c4ad38d8b830.png)
![timeline preview](https://user-images.githubusercontent.com/57643375/185009264-3311524a-0a5a-4e2b-bcd3-931a921c8da4.png)


## WORK IN PROGRESS

### How to run in dev mode

Install the dependencies
```
yarn install
```
Fill the envs and generate the `graphql.schema` file. Then, run 
```
yarn dev
```

It's also important to note that, if you run this app in dev mode, it will run two instances (backend and frontend), since it uses webpack dev server with hot reload and ts-node-dev. Therefore, you should alter the `fetchGraphQL.ts` file to point to this URL when running locally.
In production, the frontend is served from the koa server.

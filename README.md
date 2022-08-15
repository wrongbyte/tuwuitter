![preview](https://user-images.githubusercontent.com/57643375/182004479-b71eb6b3-d21d-44be-a041-c4ad38d8b830.png)

## WORK IN PROGRESS

### To-do list
- [ ] clear unused dependencies
- [ ] fix timeline bug
- [ ] redirect user to their profile when clicking on lateral bar icon
- [ ] simplify register page
- [ ] implement funcionality to post tweets on timeline component
- [ ] implement follow feature
- [ ] show followers in profiles
- [ ] display following users' tweets on timeline
- [ ] create error modal
- [ ] remove unused fields (such as birthday)
- [ ] show username in user top bar

### How to run

Install the dependencies
```
yarn install
```

Run the Redis instance:
```
docker-compose up -d
```

Run both the client and server:
```
yarn dev:all
```
The frontend will be initialized in `localhost:8080`.

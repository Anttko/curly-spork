# curly-spork

## Back-end for birdnest
### Install
```
npm install
```
### Run in development
```
npm run dev
```

### Build
```
npm run build
```

### Deployment
```
npm run deploy
```

deployed to fly.io
[https://curlyspork.fly.dev/api/drones](https://curlyspork.fly.dev/api/drones)

## Frontend repo:

[Repo](https://github.com/anttko/bug-free-birdnest)


## Endpoints

- GET /api/drones
List all drones that violate the no-fly zone

{
    id: string,
    serialNumber: string,
    timestamp: string,
    distance: number,
    positionX: number,
    positionY: number,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string
}



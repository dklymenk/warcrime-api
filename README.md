## War Crime API

## Description

TODO

## Installation

```bash
yarn install
cp .env.example .env
```

Update the database and other credentials in the `.env` file.

```bash
yarn prisma migrate deploy
yarn prisma generate
```

## Running the app

```bash
# development
yarn start

# watch mode
yarn start:dev

# production mode
yarn build
yarn start:prod
```

## Test

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```

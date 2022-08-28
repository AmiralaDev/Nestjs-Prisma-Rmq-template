<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Nestjs-Prisma Boilerplate

## Run with Docker-Compose

```bash
# development up
$ docker-compose up -d --build dev

# down
$ docker-compose down -v

# ps 
$ docker-compose ps

```

## Running the app

```bash
# installation
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test
* update `.env.test` before run test cases.

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Document
- Stack : Ts + Node.js + Nest.js + Prisma + Postgres
- Swagger : Routes are visible in swagger documentation : `/docs`.
- Default deploy : Simplest way is to use `npm/yarn` command. try to connect application to postgres with `.env` and `.env.test` for test.
- Docker deploy : Also we can use docker and docker-compose to build application. 
For simplicity, the Dockerfile is written as a single stage. And that stage is called `development`. 
This stage is targeted to the `dev` service, and `dev` service is depend on `db` service in the `docker-compose.yaml`.
so we can easily deploy the whole project with : `docker-compose up -d --build dev`.
- Why `pm2` ? 
We also used `pm2` in the docker.
because I can have multiple instance of application in every docker instead of just one instance.
Docker also does not need to be reloaded or restarted in case of any problems.
pm2 should restart the process inside Docker.
So we have a lower delay.
Also `pm2` commands like `pm2 monit` are available in docker.

- `dev-entry.sh` ? I want to run prisma migration and seed the db when application is up and connected to database.
so I can not do this commands by `CMD [* , *]` in the Dockerfile.I should have `ENTRYPOINT` and process of commands.
so I did that in `dev-entry.sh`.

- custom interceptors: We have `not-found-if-null` interceptor to return `NOT-FOUND 404` http-code if the result of some controllers was null.
- Logger : We use pino logger for this project, and it should write log streams into -> `logs/main.log`

## Environment Variables
- `DATABASE_URL` : As we use `prisma` , we should merge all `DATABASE`, `PORT` , `HOST` and `DATABASE` in
just one variable.
- `SWAGGER_EXPOSE` : If set to `true` we have swagger documentation on `/docs` route.
- `SENTRY_DSN` : Connect to sentry with this dsn ;)
- `NODE_ENV` : Enum of `development` and `production` , we decide about some important things
based on `NODE_ENV`, like log levels and etc, ...
- `PORT` : Application Port.

## Directories
- `prisma` : Its about prisma :) , we should just add seeds, migrations and schemas in this directory.
- `src` : The most important directory:
    - `common` : common or shared `interceptors` , `filters`, `guards` and ... goes there.
    - `components` : main application `components`.
    - `configs` : all application `configs`.
    - `providers` : general , or shared or global providers like `prisma`,`sentry`, `rabbitmq` , `redis` and ... . they are also a module.
    - `main.ts` : application entry point.
- `ecosystem.config.js` : pm2 config file.
- `.env` : the main `.env` file.
- `.env.test` : should fill and use for tests.
- `dev-entry.sh` : some commands should run on development deployment, by docker `ENTRYPOINT`.
- `dockerfile` : simple single stage dockerfile.
- `docker-compose.yml` : should use only for development!
# TODO App

## Setup Local Environment

Install nodejs v14 and yarn

```sh
yarn && yarn dev
```

## Run with Docker

Build the docker image and run

```sh
docker build -t todo .
docker run -p 3000:3000 todo
```

## Folder Structure

- lib
  - shared
  - todo
- pages

The folder structure follows DDD, where domain modules and the shared module are stored under the lib directory. Within each module each functions are separated into subdirectory or individual files, such as components, service, types, contexts.

## Description

Easy web scraping app that retrieves the title, text from paragraph tags, and an image from a web page.

## Installation
Install npm dependencies:
```bash
$ npm install
```
## Create mongo docker container
Before proceeding, ensure you have Docker Desktop installed on your local computer. You can download it from https://www.docker.com/products/docker-desktop/

To install the MongoDB image from Docker Hub, visit this link https://hub.docker.com/_/mongo for detailed information.

Pull the MongoDB image:
```bash
$ docker pull mongo
```

Check for the MongoDB image in Docker:
```bash
$ docker images
```
eg:
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
mongo        latest    79112eff9c89   2 weeks ago   756MB

Create and run a MongoDB Docker container:
```bash
$ docker run -p 27070:27017 -name mymongodb mongo
```

Check if the MongoDB container is running:
```bash
$ docker ps
```
eg:
CONTAINER ID   IMAGE     COMMAND                  CREATED       STATUS          PORTS                      NAMES
cf41d217cf20   mongo     "docker-entrypoint.s…"   5 hours ago   Up 41 seconds   0.0.0.0:27020->27017/tcp   mongodb

## Running the app
Start the app in watch mode:
```bash
# watch mode
$ npm run start:dev
```

## Open swagget to find api endpoits

Navigate to: http://localhost:3000/api

## Test apis

The URL format follows this pattern: abc.com, abc.or, abc.es, etc.
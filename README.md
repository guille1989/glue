## Description

Easy web scraping app that retrieves the title, text from paragraph tags, and an image from a web page.

## Installation
Install npm dependencies:
```bash
$ npm install
```
## Create mongo docker container
Before proceeding, ensure you have Docker Desktop installed on your local computer. You can download it from https://www.docker.com/products/docker-desktop/

Create and run a MongoDB Docker container:
```bash
$ docker run -p 27070:27017 -name mymongodb mongo
```

## Running the app
Start the app in watch mode:
```bash
# watch mode
$ npm run start:dev
```
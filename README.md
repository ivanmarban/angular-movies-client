# A RESTful client using AngularJS
This example is a quick exercise to illustrate how to make a RESTful client with AngularJS
## Prerequisites
- git
- node
- npm
- bower
- gulp
- Movies RESTful server [here](https://github.com/ivanmarban/node-movies-restful) or [here](https://github.com/ivanmarban/spring-boot-movies-restful)

## Installation
Clone this repository
```sh
$ git clone https://github.com/ivanmarban/angular-movies-client.git
```
Install bower dependencies and gulp stuff
```sh
$ cd angular-movies-client
$ npm install
$ bower install
```
Run gulp local web server at http://localhost:3001
```sh
$ gulp
```
## Docker
Run mongodb container
```sh
$ docker run -d -ti --name movies-database mvertes/alpine-mongo 
```
Run RESTful API container
```sh
$ docker run -d -ti -p 3000:3000 --name movies-back-end --link movies-database:db -e MONGODB_DB=movies -e MONGODB_HOST=db -e PORT=3000 ivanmarban/movies-back-end 
```
Run AngularJS App
```sh
$ docker run -d -ti -p 8080:80 --name movies-front-end --link movies-back-end:movies-back-end ivanmarban/movies-front-end 
```
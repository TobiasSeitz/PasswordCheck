# Password Check Web-App #

The PasswordCheck is a full-stack web-app that allows users to analyze the strength of a given password anonymously.
It also allows storing the results into a Mongo database (stripped from all sensitive information) to conduct
analyses. 

The app uses a NEMP Stack: NodeJS, Express, MongoDB, Polymer.

## Setup ##

### Requirements ###
Make sure you have the following installed and up and running on your machine:

- [NodeJS](https://nodejs.org/)
- [MongoDB](https://www.mongodb.org/)
- [Bower](http://bower.io/): `$ npm install -g bower`


### Installation ###
1. Install the required node packages: `$ npm install` from the project root.
2. Install the UI dependencies (web compontents): `$ cd public && bower install`

### Run ###
```
$ npm run start
```

Then visit [http://localhost:3000](http://localhost:3000)

### Optional Environment Variables ###
- `MONGO_URL`: specify the database to connect to. Default `localhost/PasswordCheck`.
- `PORT`: specify the app's port. Default 3000.
 

## Credits ##

### Dictionaries
I synthesized the German dictionary "igerman98" by Björn Jacke into a JSON array that can be used to extend 
  the dictionary that comes with zxcvbn. Find his incredible dictionary here: https://www.j3e.de/ispell/igerman98/ 

### Selected Libraries ###
- [Express](http://expressjs.com/)
- [NodeJS Express generator](https://www.npmjs.com/package/express-generator)
- [Polymer](https://github.com/Polymer/polymer)
- [zxcvbn](https://github.com/dropbox/zxcvbn)

## Contributors ##
- [Tobias Seitz](https://github.com/TobiasSeitz)
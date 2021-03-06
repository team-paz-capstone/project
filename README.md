# CS467 - Capstone Project
 <img src="/images/logos.png" width="600" alt="Tech we used">

## About

This is the Oregon State University capstone project for the 
contributors of the project. 

### Technology

#### The backend server
- Java - Spring Boot Server
- JPA for ORM
- PostGres SQL

#### The frontend

- React with Redux
- MaterialUI
- Javascript served via Spring Boot.

## To use the application 

Go to https://pazcapstone.herokuapp.com

### Configure your local heroku installation
```bash
heroku config -a pazcapstone
```

### Logging into the database
```bash
heroku pg:psql -a pazcapstone
```

## Local Backend Dev Server Setup
- Start the backend server using 
```bash
./start.sh
``` 

## Local Frontend Dev Server Setup 
- After started the backend server, run `npm run dev-server` and go to `localhost:3000` in the browser.

## Contributors
1. Matthew Anderson - anderma8@oregonstate.edu
2. Patrick Rice - ricep@oregonstate.edu
3. Zi Wei Wu - wuzi@oregonstate.edu 


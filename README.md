# CS467 - Capstone Project

## About
<description>

## Quickstart
<instructions>

### Server

##### Connect to the server
Run this before launching the server.
```bash
heroku config -a pazcapstone
```

Take the DATABASE_URL from the output and do
```bash
export DATABASE_URL=postgres://RETURNEDVALUE
```
##### Logging into the server
If you need to log in to the server for
local queries:
```bash
heroku pg:psql -a pazcapstone
```

#### Run the server

```bash
mvn spring-boot:run
```

## Contributors
1.
2.
3.





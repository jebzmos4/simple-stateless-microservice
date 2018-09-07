Hackerbay User Service API
==============================================

The hackerbay User Service API has Endpoints that authenticates a user with JWT and compresses an image to generate a thumbnail.
----------
Docker Image Link
----------
`https://hub.docker.com/r/moriagape/hackerbay-api/`

Clone repository and run npm install to setup dependencies

Create a `.env` file
----------------------------
Add the parameters below (`add your own values`)

**Environment Variables:**
```
NODE_ENV=production
BASE_URL=''
PORT=

# Private Key
PRIVATE_KEY='

LOG_LEVEL=info
LOG_ENABLE_CONSOLE=true
```

Get API running
----------------------------
```
npm run start
```
Check For Linting
-------------
```
npm run lint
```
Run Test
-------------
```
npm run test
```

## Routes

NAME     					| END POINT     |  PARAMS
--------------------------- | ------------- | ----------
Base     					| /             |
Authenticate User    	    | /login        |`username`&`password` e.g {username: 'xyz', password: '123'}
generate thumbnail          | /image        | image url `?url=https://preview.ibb.co/moSBCz/image.png`
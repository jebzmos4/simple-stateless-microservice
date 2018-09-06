Terragon Global User Service API
==============================================

The Global User Service API has Endpoints that creates a new user, get a user by the userID, update a user record, delete a user record, get all users.
----------


Get API running
----------------------------
```
node app/index
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

NAME     					| END POINT
--------------------------- | ---------------------------
Base     					| /
Get a User     			    | /user/:user_id
Get all Users               | /user
Create a User               | /user
Update User                 | /user/:user_id
Delete a User               | /user/:user_id

### List Of Global-User-Service Services

Service            | Function
------------------ | ---------------------
saveUser           | Gets the parameters from the URL and insert into the DB
getUser            | Gets the parameters from the URL and returns users based on the parameters.
getAllUsers        | returns all users from the DB
getOneUser         | Gets the parameter from the URL and returns a user
getCount           | Gets the parameter from the URL and returns a count of users based on the parameters
deleteUser         | Gets the parameters from the URL and deletes a user based on the parameter
updateUser         | Gets the parameter from the URL and updates the user record in the DB


**Environment Variables:**
```
NODE_ENV=production
BASE_URL=''
PORT=

# MongoDB Credentials
MONGODB_HOST='127.0.0.1'
MONGODB_PORT=27017
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_DB_NAME=
MONGO_QUERY_LIMIT=
MONGODB_URI=

LOG_LEVEL=info
LOG_ENABLE_CONSOLE=true
```
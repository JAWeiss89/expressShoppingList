# expressShoppingList
## About
Simple shopping list application with the purpose of practicing integration testing with supertest
## More info
### expressError.js
Error classs is extended to create a new class of errors that can be used to print useful info into console and specify the error message to the user
### routes.js
Routes are placed in different js file to reduce clutter of app.js file
### server.js
In order to test using supertest, a seperate file is created to start server on in order to not interfere with testing
### routes.test.js
All routes are tested in different scenarios

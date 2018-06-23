# Webtrekk Customer Directory

Web App for storing and consulting customer information.

### Frontend

The client app is based on Angular. It runs in evergreen browser (even IE). It was made with Bootstrap with mobile-first approach.
it's currently being hosted on Heroku.
You can access it with the following link:
https://webtrekk-customer-directory.herokuapp.com

### Backend

The backend service is based on Node.js powered by express.js.
The data is being persisted in MongoDB database. The database
is also hosted in the cloud using Atlas as it's provider.

## Setup (local environment)

You can also setup the project to run on a local environment.

### Requirements

This project requires the following modules/libraries:

- Nodejs 8.9.x or higher version
- npm 5.8.x or higher version

### Environment variables

First setup your environment variables.

windows:

set MONGO_URI=YOUR_MONGO_DATABASE_CONNECTION_STRING

Linux/MacOS:

export MONGO_URI=YOUR_MONGO_DATABASE_CONNECTION_STRING

### dependencies

To set up the project we need to install the dependencies for each project. This is because we are treating each service as a separate instance.
Run the following commands from the command prompt in the root directory:

      npm install
      cd client
      npm install
      cd ..

## Usage

To start the project run the following commands:

    npm run dev

this will start the project in development mode.
After the project started you can use the following endpoints:

| Method | Endpoint                          | Description                 |
| ------ | --------------------------------- | --------------------------- |
| GET    | http://localhost:4200             | Open the client web app     |
| GET    | http://localhost:3000/api/v1/docs | Open REST API documentation |

## Documentation

After the services started, you can also browse to the API documentation:

- http://localhost:3000/api/v1/docs

## Test

You can run the tests by running the following commands from the root directory:

      cd client
      ng test

## Author

Max Medina - https://github.com/maxmedina05

## License

This project is licensed under the terms of the **MIT** license.

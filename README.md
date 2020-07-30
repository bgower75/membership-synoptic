# membership-synoptic
Synoptic for Apprenticeship assessment
## Get started
1. Clone the repo
1. Install the project dependencies - ``npm i``
1. To start the api service  - ``npm start``
1. To run the unit tests -  ``npm run test``

## Project Structure
### `src/server.js`
This is the connection file

### `src/api/index.js`
This is the entrypoint for all of our functions.

### `src/api/router/membership-router.js`
All the requests are exported through this root module.

### `src/api/controller/memberships-controller.js`
All the requests are called from this controller

### `src/api/controller/memberships-functionality`
Each request function is defined here.

### `src/api/models/membership-model.js`
Each new schema model is delared and exported here.

### `src/api/schema/memberships.js`
The schema for the api service is contained here.

### `src/api/schema/schema-validation.js`
All validations for the schema are declared and exported here.

### `src/api/testing/membership-functionality.test.js`
All unit tests are declared here.

### `src/utilities/logger.js`
The logger functionality is declared here.

### `logs`
All logging is captured in the files declared here.

### `src/openapi.yaml`
The schema model structue and is declared here.

# REST API for "Adeeb أديب", using Express with TypeScript
E-Commerce's  REST API backend for printing Arabic literature.
## Overview:

- Tech stack:

  - Full **TypeScript**
  - **Nodejs** & **Express.js**
  - Database:
    - **MongoDB** & **Mongoose**
    - Caching with ~~Redis~~ **ValKey**
  - **Docker** Containerization

- characteristics:

  - Regression tests with Vitest.
  - CI using Github actions testing
  - JWT Authentication & Authorization
  - Error Handling
  - Data Validation with Yup and express-validator
  - Security best practices from OWASP
  - …and more

## File Structure

- _./github_ for Github actions.

- _./src_:

  - _app.ts_ is the main file for app logic, initializing middlewares and routes, and
    connecting to our MongoDB.

  - _index.ts_ is the server file to run the app.

  - _db.ts_ is the config file for MongoDB.

  - _redis.ts_ is the config file for redis.

  - _ecosystem.example.config.js_ is a template to generate PM2 config file _ecosystem.config.js_ for process management and ENVs.

  - _./config_ file to import all environment variables, and use a complex
    configuration structure if needed.

  - _./components_ file contain app's solutions by self contained components with

    - _model_ file for our mongoose models, representing app's data, using
      (\*.model.ts) naming convention for every module.

    - _service_ file for communicating(read/write) to our database, and make
      operations on data if needed, then return the data for _./controllers_,
      using (\*.service.ts) naming convention for every module.

    - _controller_ file for coordinating HTTP request & responses, and set needed
      cookies and headers, using (\*.controller.ts) naming convention for every
      module.

    - _route_ file for establishing endpoints and controllers to every modules.
      Beside validating requests, and jwt authentication. Using (\*.route.ts)
      naming convention for every module.

    - _schema_ file for validation data for post and update methods by **Yup**.
      Using (\*.schema.ts) naming convention for every module.
      

  - _./interfaces_ file for types' declarations, using (\*.interface.ts) naming
    convention for every module, beside \_**\_types\_\_** for general types. Every interface has an Enum: **ERROR_MSG** for this interface error messages, and baseEntity for TypeORM.

  - _./middlewares_ file for containing reused middlewares, which are used across
    the app, using (\*.middleware.ts) naming convention for every module.

  - _./utils_ file for containing reused functions and centralized error handling, which are used across the app.

  - _./tests/e2e_ for E2E tests

- _.env.example_ as example for ENVs.

- _tsconfig.json_ for TypeScript config

- _vitest.config.ts_ for Vitest config

- _Dockerfile_, _compose.yaml_ and _.dockerignore_ for containerization

# User Balance App

This is a simple web application built using Node.js, Express, JavaScript, and PostgreSQL (Sequelize ORM). The application manages user balances and supports concurrent requests to update these balances in real-time.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Installation

To install and run this application, follow these steps:
 **Install the dependencies:**

   ```sh
   npm install
   ```

3. **Ensure PostgreSQL is installed and running.**

4. **Create a database named `user_balance_db`:**
   Use pgAdmin or any other PostgreSQL tool to create a new database.

5. **Update the database configuration:**
   Update the `config/database.js` file with your database connection details.

## Usage

To start the application, run:

```sh
npm start
```

For development with automatic restarts on file changes, use:

```sh
npm run dev
```

The application will create the `users` table, add an initial user with a balance of 10000, and be ready to handle balance update requests.

## Project Structure

```
.
├── config
│   └── database.js
├── controllers
│   └── userController.js
├── middleware
│   └── validateBalance.js
├── migrations
│   └── 20240624_create_users.js
├── models
│   └── index.js
├── routes
│   └── userRoutes.js
├── src
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

- **config/database.js**: Database connection configuration.
- **controllers/userController.js**: Contains the logic for updating user balances.
- **middleware/validateBalance.js**: Middleware to validate balance updates.
- **migrations/20240624_create_users.js**: Database migration to create the `users` table.
- **models/index.js**: Sequelize models definition.
- **routes/userRoutes.js**: Defines the API routes.
- **server.js**: Entry point for the application.

## API Endpoints

### Update User Balance

- **URL**: `/api/update-balance`
- **Method**: `POST`
- **Parameters**:
  - `userId` (integer): ID of the user.
  - `amount` (integer): Amount to update the balance by. Can be positive or negative.
- **Response**:
  - **200 OK**: Balance updated successfully.
  - **400 Bad Request**: Invalid input or insufficient funds.

Example request:

```sh
curl -X POST http://localhost:3000/api/update-balance -H "Content-Type: application/json" -d '{"userId": 1, "amount": -2}'
```

## Testing

This application has been tested with 10,000 concurrent requests using Postman. The test ensures that:

- 5,000 requests to withdraw 2 units from the user's balance should succeed.
- The other 5,000 requests should receive an appropriate error message indicating insufficient funds.

To run the project:

1. Ensure PostgreSQL is installed and running.
2. Create a database named `user_balance_db`.
3. Update the database configuration in `config/database.js`.
4. Run `npm run dev` to start the server.

The application will create the `users` table, add an initial user, and be ready to handle balance update requests. The balance changes occur in real-time without queues or delayed tasks.

To test, send POST requests to `http://localhost:3000/api/update-balance` with a JSON body containing `userId` and `amount`.

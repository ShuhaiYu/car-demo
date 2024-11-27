# Car Search Application

A web application for searching cars with advanced filtering options.

---

## Technologies Used

### Frontend:
- **React**: For building the user interface.
- **Tailwind CSS**: For styling.
- **Axios**: For HTTP requests.
- **Vite**: For fast development and builds.

### Backend:
- **Node.js**: For the server runtime.
- **Express.js**: For backend routing and APIs.
- **MySQL**: For storing user and car data.
- **bcrypt**: For secure password hashing.
- **jsonwebtoken**: For authentication using tokens.

---

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/ShuhaiYu/car-demo.git
    cd car-demo
    ```

2. Start the backend and database using Docker:

    ```bash
    cd car-api-backend
    docker-compose up -d
    ```

3. Install and start the backend:

    ```bash
    npm install
    npm start
    ```

4. Start the frontend:

    ```bash
    cd ../car-frontend
    npm install
    npm run dev
    ```

5. Open your browser and navigate to:

    ```
    http://localhost:5173
    ```

---

## API Endpoints

### Auth Endpoints
- `POST /register`: Register a new user.
- `POST /login`: Log in and receive access and refresh tokens.
- `POST /refresh`: Refresh the access token using the refresh token.
- `POST /logout`: Log out and invalidate the refresh token.

### Car Endpoints
- `GET /car`: Retrieve car data with optional filters:
  - Query parameters:
    - `maker` (string): Filter by car maker.
    - `model` (string): Filter by car model.
    - `startYear` (integer): Filter by the starting year.
    - `endYear` (integer): Filter by the ending year.
- `GET /car/makers`: Retrieve a list of all car makers.
- `GET /car/models`: Retrieve a list of models for a specific maker (requires `maker` query parameter).

---


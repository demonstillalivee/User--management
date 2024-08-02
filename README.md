```
# User Management System

A full-stack web application for managing user profiles and authentication.

## Features

- User registration and login
- JWT-based authentication
- User profile management
- User directory with search functionality
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React
- TypeScript
- Redux Toolkit
- React Router
- Formik & Yup for form management and validation
- Tailwind CSS & Bootstrap for styling

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication

## Prerequisites

- Node.js (v14+ recommended)
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/user-management-system.git
   cd user-management-system
   ```

2. Install server dependencies:
   ```
   cd server
   npm install
   ```

3. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

4. Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secure random string.

## Running the Application

1. Start the server (from the server directory):
   ```
   npm run dev
   ```

2. In a new terminal, start the client (from the client directory):
   ```
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Running Tests

### Server Tests
From the server directory:
```
npm test
```

### Client Tests
From the client directory:
```
npm test
```

## Building for Production

### Server
From the server directory:
```
npm run build
```

### Client
From the client directory:
```
npm run build
```

## API Documentation

### Auth Routes
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user

### User Routes
- `GET /api/users/profile`: Get authenticated user's profile
- `PUT /api/users/profile`: Update authenticated user's profile
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user's profile

All user routes require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

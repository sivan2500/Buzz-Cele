# BuzzCelebDaily

## Project Structure

This project is organized into a frontend and a backend.

### Frontend
The frontend code resides in the **root** directory (index.html, src files) to maintain compatibility with the live preview environment. It is a React/Vite application.

### Backend
The backend code is located in the `backend/` directory. It is a Node.js/Express application connected to MongoDB.

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   Rename `.env.example` to `.env` and update the MongoDB URI and JWT Secret.

4. Run Server:
   ```bash
   npm run dev
   ```

## Frontend Setup

The frontend is already configured to run with Vite in the root directory.
To connect to the real backend, update the `services/` logic to make fetch calls to `http://localhost:5000/api` instead of using mock data.

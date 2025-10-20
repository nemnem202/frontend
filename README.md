# VeryLegalWebsite - Frontend

## Prerequisites

Before running the frontend, make sure the backend is up and running. The frontend depends on it to work correctly.

---

## Setup

1. Create a `.env` file in the frontend project root (you can copy `.env.example`).
2. Specify the backend URL in the `.env` file, for example:
   REACT_APP_BACKEND_URL=http://localhost:5000
   **Important:** The frontend will not work if the backend URL is missing or incorrect.

---

## Running the App

1. Make sure the backend server is running.
2. Install dependencies:
   npm install
3. Start the frontend:
   npm run dev
4. Open your browser and go to `http://localhost:3000` (or the port specified in your setup).

---

## Features

- Connect as **admin**, **modo**, or **user** depending on your backend accounts.
- Admins can manage modo accounts.
- Modos can generate invite keys for user registration.
- Users can browse products and add them to their basket.

---

## Notes

- The frontend will not work properly if the backend is not running.
- Make sure the backend URL in `.env` matches your running backend instance.
- Some features (like the basket for new users) may require logging out and logging in again.

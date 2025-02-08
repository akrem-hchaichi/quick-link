# Project Overview

This repository contains a full-stack web application with an **Express.js backend** and a **React frontend**.

## **Project Structure**

```
/quick-link
│── /server # Express.js Backend
│   ├── /src
│   │   ├── /config  # App Configuration
│   │   ├── /routes  # API Routes
│   │   ├── /models  # Database Models
│   │   ├── /controllers # Business Logic
│   │   ├── /middlewares # Custom Middleware
│   │   ├── app.ts #App File
│   │   ├── server.ts # Main Server File
│   ├── /swagger # API Documentation
│   ├── /tests# App Tests
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│── /client # React Frontend
│   ├── /src
│   │   ├── /components  # Reusable Components
│   │   ├── /pages       # Page Components
│   │   ├── /store # Redux Toolkit
│   │   ├── /types # App Types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── .env
│   ├── package.json
│   ├── vite.config.ts
│── README.md
```

## **Setup Instructions**

### **Backend Setup (Express.js)**

1. Navigate to the server folder:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure your environment variables.
4. Start the server:
   ```sh
   npm run dev
   ```

### **Frontend Setup (React + Vite)**

1. Navigate to the client folder:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure your environment variables.
4. Start the frontend:
   ```sh
   npm run dev
   ```

## **Running the Full Stack Application**

1. Start the backend and frontend as mentioned above.
2. Access the frontend at `http://localhost:5173`
3. The backend runs on `http://localhost:5000`

## **License**

This project is open-source and available under the [MIT License](LICENSE).

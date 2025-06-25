
# Role-Based MERN Blog App

This is a full-stack blog application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) that implements **role-based access control**.  
- **Admin users** can create, view, and delete blog posts.  
- **Normal users** can only view posts.  

The project includes:
- Secure authentication with JWT  
- Clean frontend UI  
- RESTful backend API  

---

## Prerequisites

Before running this project locally, make sure you have:

- Node.js installed
- A MongoDB Atlas account

---

## 🛠️ How to Set Up and Run Locally

Follow the steps below to run the project on your machine:

---

### 1. Clone the Repository

```bash
git clone https://github.com/mukundsoni07/roleBasedBlogApp
cd roleBasedBlogApp
```

---

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 3. Set Up Backend Environment Variables

Create a `.env` file in the `backend` directory:

```bash
touch .env
```

Add the following content to `.env`:

```env
PORT=8080
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

> Replace `your_mongodb_atlas_connection_string` with your actual MongoDB Atlas URI, and `your_jwt_secret_key` with a strong random string.

---

###  4. Start the Backend Server

```bash
npm run dev
```

> This will start the backend server at: `http://localhost:8080`

---

### 5. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

---

### 6. Set Up Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
touch .env
```

Add the following content:

```env
VITE_API_URL=http://localhost:8080
```

---

### 7. Start the Frontend App

```bash
npm run dev
```

> This will start the frontend at: `http://localhost:5173`

---

### 8. You're Done

Now open your browser and visit:

```
http://localhost:5173
```

- Create an **admin user** and log in to add/delete/view posts.
- Create a **normal user** and log in to only view posts.

---

## Notes

1. Make sure both backend and frontend servers are running.
2. MongoDB Atlas cluster must be online and accessible from your IP.
3. For evaluation purposes, `.env` files for both frontend and backend are included. So, you may skip **Step 3** and **Step 6** to use the preconfigured settings.
3. I am pushing my `.env` file for both frontend and backend for evaluation purpose so you can skip **step 3** and **step 6**. Doing this will use my database account on mongoDB atlas with preconfigured settings. You can setup your own and change the `MONGO_URI` in backend's .env to your connection string

---


Markdown# MyNotes API 📝

A production-ready RESTful API built with Node.js, Express, and MongoDB. This application allows users to register, securely log in, and manage their private notes. It features robust Role-Based Access Control (RBAC), JWT Authentication, and Data Isolation (users can only access their own data).

## 🚀 Features

* **User Authentication**: Secure Registration and Login using JSON Web Tokens (JWT).
* **Password Encryption**: Passwords are hashed using `bcryptjs` before storage.
* **Data Isolation**: Users can only Create, Read, Update, and Delete (CRUD) their *own* notes.
* **Security Headers**: Protected routes guard against unauthorized access.
* **Role-Based Access Control (RBAC)**: Foundation for Admin vs. User roles.
* **Error Handling**: Centralized error middleware for clean, consistent JSON responses.

## 🛠️ Tech Stack

* **Runtime**: [Node.js](https://nodejs.org/)
* **Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
* **Authentication**: JWT (jsonwebtoken) & BCrypt

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR_USERNAME/MyNotes-API.git](https://github.com/YOUR_USERNAME/MyNotes-API.git)
cd notes-api
2. Install Dependencies

npm install

3. Configure Environment Variables
Create a .env file in the root directory and add the following keys:Code snippet
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=30d
> Note: You can use a local MongoDB string (mongodb://127.0.0.1:27017/notes_db) or a Cloud Atlas string.4. Run the Server # Run in production mode
node server.js


API Endpoints
Authentication

POST,/api/v1/auth/register,   Register a new user,Public
POST,/api/v1/auth/login,      Login user & get Token,Public

Notes


GET,/api/v1/notes            Get my notes,Private 🔒
POST,/api/v1/notes           Create a note,Private 🔒
PUT,/api/v1/notes/:id        Update a note,Private 🔒
DELETE,/api/v1/notes/:id     Delete a note,Private 🔒

Note: For Private routes, add Authorization: Bearer <your_token> to the request headers.
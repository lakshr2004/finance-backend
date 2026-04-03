# 💰 Finance Data Processing & Access Control Backend

A secure backend system for managing financial records with authentication, role-based access control, and real-time analytics.

## 🚀 Tech Stack
Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, bcrypt

## 🔐 Features
- User Authentication (JWT)
- Role-Based Access Control (Admin, Analyst, Viewer)
- Financial Records CRUD
- Dashboard Summary (Income, Expense, Balance)
- User-specific Data Isolation

## 📂 Project Structure
config/  
controllers/  
middleware/  
models/  
routes/  

## 🌐 Base URL
http://localhost:5000

## 🔑 API Endpoints

### Auth
- POST /api/auth/register  
- POST /api/auth/login  

### Records
- POST /api/records  
- GET /api/records  
- PUT /api/records/:id (Admin only)  
- DELETE /api/records/:id (Admin only)  
- GET /api/records/summary  

## 📌 Sample Request

POST /api/auth/login
{
"email": "user@test.com
",
"password": "123456"
}


## 🛡️ Roles
- Admin → Full access  
- Analyst → Read + Create  
- Viewer → Read only  

## 🔒 Security
- Passwords are hashed using bcrypt  
- JWT-based authentication  
- Role-based authorization  

## ⚙️ Setup
```bash
npm install
npm run dev
🌍 Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret


📌 Author

Laksh Raj
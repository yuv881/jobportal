# 🚀 Job Portal Application

## 📌 Overview
A full-stack Job Portal platform that connects **job seekers** with **recruiters**.  
Users can explore job listings, apply, and track applications, while recruiters can post and manage job opportunities.

---

## 🛠️ Tech Stack

### 🎨 Frontend
- ⚛️ React.js  
- 🎨 Tailwind CSS  
- 🔗 Axios  
- 🧭 React Router  

### ⚙️ Backend
- 🟢 Node.js  
- 🚀 Express.js  
- 🍃 MongoDB  
- 🔐 JWT Authentication  

---

## ✨ Features

### 👤 Job Seeker
- 🔑 User Authentication (Register / Login)
- 🔍 Browse available jobs
- 📄 Apply to jobs
- 📌 Track applied jobs
- 🧑‍💼 Update profile

### 🏢 Recruiter / Admin
- ➕ Create job postings
- ✏️ Edit / Delete jobs
- 👀 View applicants
- 📊 Manage job listings

---

## 🔐 Environment Variables

Create a `.env` file in the backend directory and add:

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
PORT=5000

# 📝 Blog App

A full-stack Blog Platform built with the MERN stack and Tailwind CSS, featuring user authentication and protected routes.

## 🚀 Features
- User registration and login system
- JWT authentication with protected routes
- Create, Read, Update, and Delete blog posts
- Category filtering for posts
- Responsive design with Tailwind CSS
- Only post authors can edit or delete their own posts

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, Vite, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT, bcryptjs
- **Version Control:** Git, GitHub

## ⚙️ Installation

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔑 Environment Variables
Create a `.env` file inside the `backend` folder:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/blogapp
JWT_SECRET=your_jwt_secret_key
```

## 👨‍💻 Author
**Mohamed Amal Rushdi**  
Software Engineering Student at Cardiff Metropolitan University  
GitHub: [@amalrushdi29](https://github.com/amalrushdi29)
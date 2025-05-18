# Blogify - MERN Stack Blog Platform

A full-stack blog application that enables users to create, read, update, and delete blog posts with proper authentication and authorization.

## Live Demo

- **Frontend**: [https://blog-website-mern-teal.vercel.app/](https://blog-website-mern-teal.vercel.app/)
- **Backend API**: [https://blog-website-mern-83je.onrender.com](https://blog-website-mern-83je.onrender.com)

> **Note**: Due to the use of a free-tier Render account, the backend server may enter an inactive state during periods of low activity. This may introduce a delay in response time, as Render notes: "Your free instance will spin down with inactivity, which can delay requests by 50 seconds or more." Kindly allow a brief waiting period, and a refresh may be required to ensure the server response is received.

## Blogify Screenshots

![image](https://github.com/user-attachments/assets/9171ebba-5a59-4815-8e25-da783beb4f63)
![image](https://github.com/user-attachments/assets/0e776f94-f988-4f81-9e96-3ff4be3bdf12)
![image](https://github.com/user-attachments/assets/1fc123ec-0bf4-434f-8d30-78ab3a8acb21)
![image](https://github.com/user-attachments/assets/58c700d6-3212-431e-9699-6e07b818e5d0)




## Project Features

- **User Authentication**: Secure signup and login functionality with JWT
- **Blog Management**: Create, read, update, and delete blog posts
- **Access Control**: Users can only modify their own content
- **Content Discovery**: Browse all blogs with filtering capabilities by category and author
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

## Tech Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt.js**: Password encryption

### Frontend
- **React.js**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Declarative routing for React applications

## Project Structure

```
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── ScrollToTop.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── blogController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Blog.js
│   │   └── User.js
│   ├── node_modules/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package-lock.json
│   └── package.json
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Backend Setup
1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
5. Start the server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with:
   ```
   VITE_API_URL=http://localhost:5000 (or your backend API URL)
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Authenticate and receive JWT token

### Blogs
- `GET /blogs` - Retrieve all blogs (requires authentication)
- `GET /blogs?category=:category&author=:author` - Filter blogs
- `POST /blogs` - Create a new blog post (requires authentication)
- `PUT /blogs/:id` - Update a blog post (only by the author)
- `DELETE /blogs/:id` - Delete a blog post (only by the author)

## Database Models

### User
```javascript
{
  name: String,
  email: String,
  password: String, // encrypted
  createdAt: Date
}
```

### Blog
```javascript
{
  title: String,
  category: String, // e.g., "Career", "Finance", "Travel"
  author: String, // populated from user data
  content: String,
  image: String, // optional URL
  userId: ObjectId, // references User
  createdAt: Date,
  updatedAt: Date
}
```


## Deployment

The application is deployed using:
- **Frontend**: Vercel
- **Backend**: Render


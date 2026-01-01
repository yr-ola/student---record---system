# 📚 Student Record Management System

A comprehensive web-based student record management system built with **Node.js**, **Express**, and **MySQL**. This application enables institutions to manage student records, course registrations, and academic grades efficiently.

---

## ✨ Features

- 🔐 **Student Authentication** - Secure login system for students
- 📋 **Student Dashboard** - View personal information and academic records
- 📝 **Course Registration** - Track enrolled courses and credit units
- 📊 **Grade Management** - View grades and GPA points for registered courses
- 🔗 **RESTful API** - Clean API endpoints for all operations
- 🗄️ **MySQL Database** - Robust data persistence
- 🌐 **CORS Support** - Cross-origin resource sharing enabled
- 🔒 **Environment Configuration** - Secure credential management with .env

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14.0 or higher) - [Download](https://nodejs.org)
- **npm** (comes with Node.js)
- **MySQL Server** (v5.7 or higher) - [Download](https://www.mysql.com/downloads/mysql/)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yr-ola/student---record---system.git
cd student-record-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root with the following:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=emmanuel2008$
DB_NAME=sarms
PORT=3000
```

> **Note:** Make sure to update credentials according to your MySQL setup.

### 4. Set Up the Database

Import the SQL database schema:

```bash
mysql -u root -p sarms < sarms.sql
```

When prompted, enter your MySQL password.

---

## 🏃 Running the Application

### Start the Server
```bash
npm start
```

The server will start on `http://localhost:3000`

### Access the Application

- **Login Page:** `http://localhost:3000/client/login.html`
- **Dashboard:** `http://localhost:3000/client/dashboard.html`

---

## 📁 Project Structure

```
student-record-system/
├── client/                 # Frontend files
│   ├── login.html         # Student login page
│   ├── dashboard.html     # Student dashboard
│   └── style.css          # Stylesheet
├── server/                # Backend files
│   ├── server.js          # Express server & API endpoints
│   └── db.js              # Database connection (legacy)
├── sarms.sql              # Database schema
├── package.json           # Node.js dependencies
├── .env                   # Environment variables (not in git)
├── .gitignore             # Git ignore rules
└── README.md              # This file
```

---

## 🔌 API Endpoints

### Login
**POST** `/login`
```json
Request Body:
{
  "matric": "CSC001",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "matric": "CSC001",
  "fullName": "John Doe"
}
```

### Get Student Record
**GET** `/student/:matric`
```json
Response:
{
  "student": {
    "MatricNumber": "CSC001",
    "FullName": "John Doe",
    "Level": 200,
    "Department": "Computer Science"
  },
  "courses": [
    {
      "CourseCode": "CSC201",
      "Title": "Data Structures",
      "CreditUnits": 3,
      "LetterGrade": "A",
      "GPAPoints": 4.0
    }
  ]
}
```

---

## 🗄️ Database Schema

The system uses the following main tables:

- **STUDENT** - Student information and credentials
- **COURSE** - Course details and credit units
- **REGISTRATION** - Course enrollments
- **GRADE** - Student grades and GPA points
- **DEPARTMENT** - Department information

---

## 🔒 Security Notes

- ✅ Credentials stored in `.env` (not committed to git)
- ✅ `.gitignore` prevents `node_modules` from being tracked
- ✅ Passwords hashed in database (implement in production)
- ⚠️ HTTPS recommended for production deployments

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.21.2 | Web framework |
| cors | ^2.8.5 | Cross-origin support |
| mysql | ^2.18.1 | MySQL connector |
| mysql2 | ^3.14.1 | MySQL2 connector |
| dotenv | ^16.0.3 | Environment config |

---

## 🛠️ Troubleshooting

### Cannot connect to MySQL
- Ensure MySQL server is running
- Check `.env` credentials match your MySQL setup
- Verify database `sarms` exists

### npm not found
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart your terminal after installation

### Port 3000 already in use
- Change `PORT` in `.env` file to an available port
- Or kill the process using port 3000

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**yr-ola** - [GitHub Profile](https://github.com/yr-ola)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a **Pull Request**.

---

## 📧 Support

For issues or questions, please open an issue in the [GitHub repository](https://github.com/yr-ola/student---record---system/issues).

---

**Last Updated:** January 1, 2026

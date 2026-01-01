const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Error:", err);
  } else {
    console.log("MySQL connected");
  }
});

app.post('/login', (req, res) => {
  const { matric, password } = req.body;

  const query = `
    SELECT * FROM STUDENT
    WHERE MatricNumber = ? AND Password = ?
  `;

  db.query(query, [matric, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid matric number or password" });
    }

    const student = result[0]; // ✅ FIXED: define the variable

    // ✅ Only one response
    res.json({
      message: "Login successful",
      matric: student.MatricNumber,
      fullName: student.FullName
    });
  });
});

app.get('/student/:matric', (req, res) => {
  const { matric } = req.params;
  console.log(`[DEBUG] Fetching data for matric: ${matric}`);

  if (!matric || typeof matric !== 'string') {
    console.error('[ERROR] Invalid matric number format:', matric);
    return res.status(400).json({ error: 'Invalid matric number format' });
  }

  const studentQuery = `
    SELECT s.MatricNumber, s.FullName, s.Level, s.DepartmentCode, d.DeptName AS Department
    FROM STUDENT s
    JOIN DEPARTMENT d ON s.DepartmentCode = d.DepartmentCode
    WHERE s.MatricNumber = ?
  `;

  const registrationQuery = `
    SELECT r.RegistrationID, c.CourseCode, c.Title, c.CreditUnits
    FROM REGISTRATION r
    JOIN COURSE c ON r.CourseCode = c.CourseCode
    WHERE r.MatricNumber = ?
  `;

  db.query(studentQuery, [matric], (err, studentResult) => {
    if (err) {
      console.error('[ERROR] Failed to fetch student:', err);
      return res.status(500).json({ error: 'Error fetching student data', details: err.message });
    }

    if (studentResult.length === 0) {
      console.log(`[INFO] No student found for matric: ${matric}`);
      return res.status(404).json({ error: 'Student not found' });
    }

    const student = studentResult[0];
    console.log('[DEBUG] Student data:', student);

    db.query(registrationQuery, [matric], (err, registrationResult) => {
      if (err) {
        console.error('[ERROR] Failed to fetch registrations:', err);
        return res.status(500).json({ error: 'Error fetching registrations', details: err.message });
      }

      console.log('[DEBUG] Registrations count:', registrationResult.length);

      if (registrationResult.length === 0) {
        console.log(`[INFO] No registrations found for matric: ${matric}`);
        return res.json({ student, courses: [] });
      }

      const registrationIds = registrationResult.map(r => r.RegistrationID);
      const gradesQueryWithIds = `
        SELECT 
          g.RegistrationID,
          g.LetterGrade, 
          g.GPAPoints
        FROM GRADE g
        WHERE g.RegistrationID IN (${registrationIds.map(() => '?').join(',')})
      `;

      db.query(gradesQueryWithIds, registrationIds, (err, gradesResult) => {
        if (err) {
          console.error('[ERROR] Failed to fetch grades:', err);
          return res.status(500).json({ error: 'Error fetching grades', details: err.message });
        }

        console.log('[DEBUG] Grades count:', gradesResult.length);

        const courses = registrationResult.map(reg => {
          const grade = gradesResult.find(g => g.RegistrationID === reg.RegistrationID);
          return {
            CourseCode: reg.CourseCode,
            Title: reg.Title,
            CreditUnits: reg.CreditUnits,
            LetterGrade: grade ? grade.LetterGrade : 'N/A',
            GPAPoints: grade ? grade.GPAPoints : 0
          };
        });

        res.json({ student, courses });
      });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

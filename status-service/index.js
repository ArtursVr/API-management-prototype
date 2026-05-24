const express = require('express');
const app = express();

const students = [
  {
    studentId: "s1001",
    name: "Anna Kalniņa",
    personalCode: "010199-12345",
    program: "Datorsistēmas",
    faculty: "DITF",
    year: 2,
    status: "active"
  },
  {
    studentId: "s1002",
    name: "Jānis Ozols",
    personalCode: "120398-54321",
    program: "Informācijas tehnoloģijas",
    faculty: "DITF",
    year: 3,
    status: "active"
  },
  {
    studentId: "s1003",
    name: "Laura Liepa",
    personalCode: "050200-67890",
    program: "Ekonomika",
    faculty: "IEVF",
    year: 1,
    status: "active"
  },
  {
    studentId: "s9999",
    name: "Test Student",
    personalCode: "000000-00000",
    program: "Test",
    faculty: "TEST",
    year: 1,
    status: "active"
  }
];

app.get('/status/:id', (req, res) => {
  const student = students.find(s => s.studentId === req.params.id);

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
});

app.listen(3001, () => {
  console.log("Status service running on port 3001");
});
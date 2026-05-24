const express = require('express');
const app = express();

const payments = [
  {
    studentId: "s1001",
    tuitionFee: 2000,
    paid: 2000,
    debt: 0,
    paymentStatus: "Samaksats",
    lastPaymentDate: "2025-02-01"
  },
  {
    studentId: "s1002",
    tuitionFee: 2000,
    paid: 1500,
    debt: 500,
    paymentStatus: "Nepabeigts",
    lastPaymentDate: "2025-03-10"
  },
  {
    studentId: "s1003",
    tuitionFee: 1800,
    paid: 0,
    debt: 1800,
    paymentStatus: "neapmaskats",
    lastPaymentDate: null
  }
];

app.get('/payment/:id', (req, res) => {
  const payment = payments.find(p => p.studentId === req.params.id);

  if (!payment) {
    return res.status(404).json({ error: "Payment data not found" });
  }

  res.json(payment);
});

app.listen(3002, () => {
  console.log("Payment service running on port 3002");
});
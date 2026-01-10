const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let payments = {}; // temporary storage

app.post("/paid", (req, res) => {
  const { username, method } = req.body;
  payments[username] = "pending";

  // DISCORD WEBHOOK (add later)
  console.log(`Payment request from ${username} via ${method}`);

  res.sendStatus(200);
});

app.get("/status/:user", (req, res) => {
  const user = req.params.user;
  res.json({ status: payments[user] || "none" });
});

// ADMIN CONFIRM
app.get("/confirm/:user", (req, res) => {
  const user = req.params.user;
  payments[user] = "done";
  res.send("Payment confirmed");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));

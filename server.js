const express = require("express");
const cors = require("cors");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());
app.use(express.json());

const DISCORD_WEBHOOK = "YOUR_WEBHOOK_URL";

app.get("/", (req, res) => {
  res.send("Backend running OK");
});

app.post("/payment-done", async (req, res) => {
  const { username, amount, method } = req.body;

  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `💰 New Payment\nUser: ${username}\nAmount: ${amount}\nMethod: ${method}`
    })
  });

  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));

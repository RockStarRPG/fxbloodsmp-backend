const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1459580684975734886/yUcfD2p5PzMazNQnKapCoENQ7LjOrcWyLpIl_Qhmb9t2QHV1VUkrn0WHC-kft5iZ7rVn";

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

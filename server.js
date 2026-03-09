const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/pollDB");

const Poll = mongoose.model("Poll", {
  question: String,
  options: [
    {
      text: String,
      votes: Number
    }
  ]
});

app.post("/createPoll", async (req, res) => {
  const poll = new Poll(req.body);
  await poll.save();
  res.send(poll);
});

app.get("/polls", async (req, res) => {
  const polls = await Poll.find();
  res.send(polls);
});

app.post("/vote/:id/:index", async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  poll.options[req.params.index].votes += 1;
  await poll.save();
  res.send(poll);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
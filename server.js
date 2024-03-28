require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const Thread = require("./models/Thread");

const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());
app.use(express.static("public"));

mongoose
  .connect(
    `${DATABASE_URL}`
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.get("/api/v1/threads", async(req, res) => {
  try {
    const allThreads = await Thread.find({});
    res.status(200).json(allThreads);
  } catch(err) {
    console.log(err);
  }
});

app.post("/api/v1/thread", async(req, res) => {
  try {
    const createThread = await Thread.create(req.body);
    res.status(200).json(createThread);
  } catch(err) {
    console.log(err);
  }
});

app.listen(PORT, console.log("server running"));

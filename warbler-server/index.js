require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectuser } = require("./middleware/auth");

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// all routes goes here
app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:id/messages",
  loginRequired,
  ensureCorrectuser,
  messageRoutes
);

app.get("/api/messages", loginRequired, async (req, res, next) => {
  try {
    let messages = await db.Message.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true,
      });

    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

// Global error handling
app.use((req, res, next) => {
  let err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});

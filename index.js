require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressjwt = require("express-jwt");
const { noteRouter, authRouter } = require("./routers/index");
const PORT = process.env.PORT || 5000;

const app = express();

// connect to db
mongoose.set("useCreateIndex", true);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(
    () => {
      console.log("Database is now connected");
    },
    err => {
      console.log("Cannot connect to database + ", err);
    }
  );
console.log(process.env.MONGODB_URI, 'nglsjkngh');
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

if (process.env.NODE_ENV === 'production') {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

app.use("/api", expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'], }));

// Add routes
app.use("/api/note", noteRouter);
app.use("/auth", authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

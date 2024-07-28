require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const DB_CONNECT = require("./dp/DB_CONNECT");
const authRoutes = require("./routes/auth");
const jopRoutes = require("./routes/jobs");
const auth = require("./middlewares/auth");
const PORT = process.env.PORT || 3000;
const statusText = require("./utils/statusText");
// middleware
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/jops", auth, jopRoutes);
// global middleware for not found router
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: statusText.Error,
    message: "This resource is not available",
    data: null,
  });
});
// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || statusText.Error,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});
const main = async () => {
  try {
    await DB_CONNECT(process.env.MONGO_URL).then(() => {
      console.log("Done connect DP");
    });
    app.listen(PORT, console.log(`app listing on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};
main();

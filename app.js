const express = require("express");

const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");

const { protect } = require("./middleware/authMiddleware");
const { authorizeRoles } = require("./middleware/roleMiddleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);

app.get("/api/protected", protect, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get("/api/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.status(200).json({
    message: "Welcome Admin",
  });
});

app.get(
  "/api/analysis",
  protect,
  authorizeRoles("admin", "analyst"),
  (req, res) => {
    res.status(200).json({
      message: "Analysis data accessed",
    });
  }
);

module.exports = app;
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// uploads folder create if not exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Multer Storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Static folders
app.use("/uploads", express.static("uploads"));
app.use(express.static("public"));

// Home Page API (file list)
app.get("/files", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.json([]);
    res.json(files);
  });
});

// Upload Route
app.post("/upload", upload.single("file"), (req, res) => {
  res.redirect("/");
});

// Server Start
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});

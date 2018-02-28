var path = require("path");
var express = require("express");
var router = express.Router();
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function(req, file, cb) {
    const extension = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, extension);
    const fileName = baseName + "-" + Date.now() + extension;
    cb(null, fileName);
  }
});

var upload = multer({ storage: storage });

router.post("/upload", upload.any(), function(req, res) {
  res.send("Uploaded ! ");
});

module.exports = router;

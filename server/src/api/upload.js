const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const PoleCIngestor = require("../dataIngestors/interactions/PoleCIngestor");
/*
WikiT.xls
EOS.xls
SORA.xls
*/

const rootDestinationFolder = "./public";
const subDestinationFolder = "/uploads";
const destinationFolder = rootDestinationFolder + subDestinationFolder;

fs.existsSync(rootDestinationFolder) || fs.mkdirSync(rootDestinationFolder);
fs.existsSync(subDestinationFolder) || fs.mkdirSync(subDestinationFolder);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, destinationFolder);
  },
  filename: function(req, file, cb) {
    console.log(file);
    const extension = path.extname(file.originalname);
    let baseName = path.basename(file.originalname, extension);
    baseName = baseName.toLowerCase();
    const fileName = baseName + "." + new Date().toISOString() + extension;
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage });

router.post("/upload", upload.any(), function(req, res) {
  req.files.map(file => {
    console.log(file);
    console.log(file.fieldname);
    if (file.fieldname === "sora") {
      const filePath = file.path;
      const sheetName = "v1";
      const ingestor = new PoleCIngestor(filePath, sheetName);
      ingestor
        .save()
        .then(data => {
          console.log(data);
          res.send("Uploaded and saved ! ");
        })
        .catch(console.error);
    } else {
      res.send("Uploaded ! ");
    }
  });
});

module.exports = router;

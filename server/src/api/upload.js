const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const PoleCIngestor = require("../dataIngestors/interactions/PoleCIngestor");
const PoleTIngestor = require("../dataIngestors/interactions/PoleTIngestor");
const Pole3EIngestor = require("../dataIngestors/interactions/Pole3EIngestor");
const EtablissementsIngestor = require("../dataIngestors/EtablissementsIngestor");
const NomenclaturesIngestor = require("../dataIngestors/NomenclaturesIngestor");
/*
WikiT.xls
EOS.xls
SORA.xls
*/

const rootDestinationFolder = path.resolve(
  __dirname,
  (__DIST ? "." : "../..") + "/public"
);
const subDestinationFolder = "/uploads";
const destinationFolder = rootDestinationFolder + subDestinationFolder;

fs.existsSync(rootDestinationFolder) || fs.mkdirSync(rootDestinationFolder);
fs.existsSync(destinationFolder) || fs.mkdirSync(destinationFolder);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, destinationFolder);
  },
  filename: function(req, file, cb) {
    const extension = path.extname(file.originalname);
    let baseName = path.basename(file.originalname, extension);
    baseName = baseName.toLowerCase();
    const fileName = baseName + "." + new Date().toISOString() + extension;
    cb(null, fileName);
  }
});

const removeOldFiles = (fieldName, newFileName) => {
  fs.readdirSync(destinationFolder).forEach(folderFileName => {
    let regex = new RegExp(fieldName, "i");
    let match = folderFileName.match(regex);

    if (match && folderFileName != newFileName) {
      fs.unlinkSync(destinationFolder + "/" + folderFileName);
    }
  });
  return;
};

const upload = multer({ storage: storage });

const filesOptions = {
  sora: {
    fileName: "sora",
    sheetName: "v1",
    ingestorClass: PoleCIngestor
  },
  wikit: {
    fileName: "wikit",
    sheetName: "wikit",
    ingestorClass: PoleTIngestor
  },
  eos: {
    fileName: "eos",
    sheetName: "Sheet1",
    ingestorClass: Pole3EIngestor
  },
  siene: {
    fileName: "siene",
    sheetName: "Sheet1",
    ingestorClass: EtablissementsIngestor
  },
  nomenclature: {
    fileName: "nomenclature",
    ingestorClass: NomenclaturesIngestor
  }
};

router.post("/upload", upload.any(), function(req, res) {
  let responseData = {
    files: {}
  };
  Promise.all(
    req.files.map(file => {
      const fieldName = file.fieldname;
      responseData.files[fieldName] = { success: null, message: null };

      const keys = Object.keys(filesOptions);
      const index = keys.indexOf(fieldName);
      if (index > -1) {
        const fileOptions = filesOptions[fieldName];
        const filePath = file.path;
        const sheetName = fileOptions.sheetName;
        const ingestor = new fileOptions.ingestorClass(filePath, sheetName);
        return ingestor
          .reset()
          .then(data => {
            return ingestor.save();
          })
          .then(data => {
            removeOldFiles(fieldName, file.filename);
            responseData.files[fieldName].success = true;
            responseData.files[fieldName].message = "Uploaded and saved ! ";
          })
          .catch(error => {
            console.error(error);
            responseData.files[fieldName].success = false;
            responseData.files[fieldName].message = "Ingestor error";
          });
      } else {
        responseData.files[fieldName].success = true;
        responseData.files[fieldName].message = "Uploaded ! ";
        return Promise.resolve();
      }
    })
  ).then(() => {
    res.send(responseData);
  });
});

module.exports = router;

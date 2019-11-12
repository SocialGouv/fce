const https = require("https");
const fs = require("fs");

const Shell = require("./Shell");

class DownloadSireneShell extends Shell {
  async execute() {
    const baseSireneUrl = "https://files.data.gouv.fr/insee-sirene/";
    const sireneFiles = [
      "StockUniteLegale_utf8.zip",
      "StockEtablissement_utf8.zip"
    ];

    console.log("Start task");

    sireneFiles.forEach(fileName => {
      console.log("Download " + fileName);
      this.downloadAndWriteFile(baseSireneUrl + fileName, fileName);
    });
  }

  async downloadAndWriteFile(url, filename) {
    const file = fs.createWriteStream(filename);

    await https.get(url, function(response) {
      response.pipe(file);
    });
  }
}

module.exports = DownloadSireneShell;

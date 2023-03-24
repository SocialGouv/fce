import Communes from "../models/Communes";
import Naf from "../models/Naf";
import Departements from "../models/Departements";
import withAuth from "../middlewares/auth";

const express = require("express");
const router = express.Router();

router.get("/communes", withAuth, function (req, res) {
  const query = (req.query["q"] || "").trim();

  if (query.length < 2) {
    return res.send({ success: false, message: "query too short" });
  }

  const communes = new Communes();

  communes.search(query).then((communes) => {
    const success = Array.isArray(communes);
    return res.send({ success, results: communes });
  });
});

router.get("/naf", withAuth, function (req, res) {
  const naf = new Naf();

  naf.findAll().then((nafs) => {
    const success = Array.isArray(nafs);
    if (success) {
      return res.send({ success, results: nafs });
    }
    return res.send({
      success,
      results: [],
      message: "Une erreur est survenue lors de la recherche d'un code NAF",
    });
  });
});

router.get("/departements", withAuth, function (req, res) {
  const query = (req.query["q"] || "").trim();

  const departements = new Departements();

  departements.search(query).then((departements) => {
    const success = Array.isArray(departements);
    return res.send({ success, results: departements });
  });
});

export default router;

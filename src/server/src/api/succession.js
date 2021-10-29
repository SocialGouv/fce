import withAuth from "../middlewares/auth";
import { preconfiguredLimitRate } from "../middlewares/limit-rate";
import Succession from "../models/Sucession";

const express = require("express");
const router = express.Router();

const isSiret = (str) => str.match(/^[0-9]{14}$/);

router.get("/successions/:siret", withAuth, preconfiguredLimitRate(), async (req, res) => {
    const { siret } = req.params;

    if (!isSiret(siret)) {
        res.status(400).json({
            message: "SIRET is invalid",
        });
        return;
    }

    const succession = new Succession();

    const results = await succession.getBySiret(siret);

    const success = Array.isArray(results);
    return res.send({ success, results });
});

export default router;

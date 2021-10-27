import express from "express";
// eslint-disable-next-line node/no-missing-import
import withAuth from "../middlewares/auth";
import IndexEgapro from "../models/IndexEgapro";

const router = express.Router();

router.get("/egapro/:siren", withAuth, async (req, res) => {
    const { siren } = req.params;

    if (!siren || typeof siren !== "string") {
        console.error("'siren' parameter is mandatory and must be a string");
        return res.status(400).send({
            success: false,
            error: "'siren' parameter is mandatory and must be a string",
        });
    }

    try {
        const indexEgapro = new IndexEgapro();

        const indexes = await indexEgapro.findBySiren(siren);

        return res.send({
            success: true,
            data: indexes,
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: e.message,
        });
    }
});

export default router;

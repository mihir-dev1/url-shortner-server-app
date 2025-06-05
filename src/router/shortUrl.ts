import express from "express";
import { createUrl, deleteUrl, getUrl, getUrlById } from "../controllers/shortUrl";

const router = express.Router();

router.post("/shortUrl", createUrl);
router.get("/shortUrl", getUrl);
router.get("/shortUrl/:id", getUrlById);
router.delete("/shortUrl/:id", deleteUrl);

export default router;
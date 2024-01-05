import express from "express";

import { getBookController } from "../controller/bookController";
import { marketController } from "../controller/marketController";

const router = express.Router();

router.get("/book", getBookController);
router.post("/market", marketController);

export default router;

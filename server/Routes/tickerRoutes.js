import express from "express";



import { getStoredTickers } from "../controllers/tickerController.js";

const router = express.Router();

router.route("/get").get(getStoredTickers);

let tickerRouter = router;

export default tickerRouter;

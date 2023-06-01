import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import tickerRouter from "./Routes/tickerRoutes.js";

dotenv.config({ path: "config/config.env" });

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1", tickerRouter);
app.use(errorMiddleware);
export default app;

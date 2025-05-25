import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.use("/api", router);

app.use(errorHandler);

export default app;

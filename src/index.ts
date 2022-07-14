import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import chalk from "chalk";
import errorHandler from "./middlewares/errorHandlerMiddleware.js"
import router from "./routers/index.js";


dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);

const port = +process.env.PORT || 5000;
app.listen(port, () => {
  console.log(chalk.bold.green('Server running on port ' + process.env.PORT))
});
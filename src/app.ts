import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const app = express();
const port = config.get<number>("port");

app.use(express.json());

app.listen(port, async () => {
  logger.info("Server is running at http://localhost:%d", port);
  await connect();

  routes(app);
});

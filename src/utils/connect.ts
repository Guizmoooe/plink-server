import mongoose from "mongoose";
import config from "config";
import logger from "../utils/logger";

async function connect() {
  const dbUri = config.get<string>("mongoUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("DB Connected");
  } catch (error) {
    logger.error("DB not connected");
    process.exit(1);
  }
}

export default connect;

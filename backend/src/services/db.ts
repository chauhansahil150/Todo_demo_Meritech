import { connect } from "mongoose";

export async function connectToMongoDB() {
  await connect(process.env.MONGO_URL || "");
}

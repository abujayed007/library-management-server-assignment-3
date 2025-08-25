import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not defined.");
    }
    await mongoose.connect(mongoUri);
    console.log("connected to Mongodb using mongoose");
    app.listen(PORT, () => {
      console.log(`Server listen on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

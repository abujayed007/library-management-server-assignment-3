import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin_um:Jayed778@cluster0.lugl172.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to Mongodb using mongoose");
    server = app.listen(PORT, () => {
      console.log(`Server listen on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

// Global Imports
import app from "./app";
import mongoose from "mongoose";

// Local Imports
import env from "./utils/validateEnv";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING!)
  .then(() => {
    console.log("Mongoose Connected !");

    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  })
  .then(console.error);

// Global Imports
import app from "./app";
import mongoose from "mongoose";

// Local Imports
import env from "./utils/validateEnv";

const port = env.PORT;

// mongoose
//   .connect(env.MONGO_CONNECTION_STRING!)
//   .then(() => {
//     console.log("Mongoose Connected !");

//     app.listen(port, () => {
//       console.log("Server running on port: " + port);
//     });
//   })
//   .then(console.error);

(async () => {
  try {
    mongoose.connect(env.MONGO_CONNECTION_STRING!);

    console.log("Mongoose Connected ! Lets Go .. !");

    app.listen(port, () => {
      console.log("Server running on port: " + port);
    });
  } catch (error) {
    console.error(error);
  }
})();

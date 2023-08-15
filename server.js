require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./config");
const port = process.env.PORT;
async function serverStart() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("server is not connected", error);
  }
}
async function connect() {
  try {
    await serverStart();
  } catch (error) {
    console.log("server is not started", error);
  }
}
connect();

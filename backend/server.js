import express from "express";
import generateRoute from "./routes/generate.route.js";
// import { connectToModel } from "./util/aiModel.js"

const app = express();
app.use(express.json());
app.use("/api/generate", generateRoute);

// app.locals.model  = connectToModel()
app.listen(3000, () => {
  console.log("server listening at port 3000");
});

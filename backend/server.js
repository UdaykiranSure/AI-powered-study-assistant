import express from "express";
import connectToDb from "./db/connectToDb.js";
import generateRoute from "./routes/generate.route.js";
import documentRoute from "./routes/document.route.js"
// import { connectToModel } from "./util/aiModel.js"

const app = express();
app.use(express.json());
app.use("/api/generate", generateRoute);
app.use("/api/document",documentRoute)
// app.locals.model  = connectToModel()
app.listen(3000, () => {
  connectToDb()
  console.log("server listening at port 3000");
});

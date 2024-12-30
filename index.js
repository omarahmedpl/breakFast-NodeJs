import express from "express";
import { bootstrap } from "./src/app.controller.js";
const app = express();
const PORT = 3000;
bootstrap(app , express);

app.listen(PORT, () => {
  console.log(`App is Working on PORT ${PORT}`);
});

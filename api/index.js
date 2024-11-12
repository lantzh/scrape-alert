import express from "express";
import routes from "./handlers/routes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.port || "3000";

const userId = process.env.USERNAME;
const dataType = "USER_DATA";

app.use(express.json());
app.use("/api", routes(userId, dataType));

if (process.env.NODE_ENV !== "lambda") {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

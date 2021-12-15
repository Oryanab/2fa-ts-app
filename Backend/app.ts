import express from "express";
import cors from "cors";
import connectionRouter from "./routers/connection";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", connectionRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

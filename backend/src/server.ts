import express, { json, Request, Response } from "express"; 
import cors from "cors";
import morgan from "morgan";
import process from "process";
import dotenv from "dotenv";

import { connectDB } from "./db/connect";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import userRoutes from "./routes/user";
import itemRoutes from "./routes/item";

dotenv.config();


const app = express();
const PORT = Number(process.env.PORT) || 5000;
const HOST = "127.0.0.1";

// For accessing api
app.use(cors());

app.use(json());
// Displays requests and status codes on terminal
app.use(morgan("dev"));

// auth routes
app.use("/auth", authRoutes);

// task routes
app.use("/task", taskRoutes);

// user routes
app.use("/user", userRoutes);

// item routes
app.use("/item", itemRoutes);

// Stub endpoint ///////////////////////////////////////
app.get("/hi", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

const start = async () => {
  await connectDB();

  const server = app.listen(PORT, HOST, () => {
    console.log(`Server started on ${PORT} at ${HOST}`);
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Shutting down server gracefully.");
      process.exit();
    });
  });
};

start();


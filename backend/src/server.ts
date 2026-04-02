import express, { json, Request, Response } from "express"; 
import cors from "cors";
import morgan from "morgan";
import process from "process";

const app = express();
const PORT = 5000;
const HOST = "127.0.0.1";

app.use(json());
// For accessing api
app.use(cors());
// Displays requests and status codes on terminal
app.use(morgan("dev"));

// Stub endpoint
app.get("/hi", (req: Request, res: Response) => {
  res.json({ message: "Hello World!" });
});

const server = app.listen(PORT, HOST, () => {
  console.log(`Server started on ${PORT} at ${HOST}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Shutting down server gracefully.");
    process.exit();
  });
});




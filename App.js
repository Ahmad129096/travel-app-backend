import express from "express";
import path from 'path'
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./connection/db.js";
import TravellingRoutes from './Routes/TravellingRoutes.js'
import { notFound, errorHandler } from './Middleware/errorMiddleware.js'
//import uploadRoutes from './Routes/uploadRoutes.js'


dotenv.config();

connectDB();

const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use(cors());

//Routing
app.use("/api/travel",TravellingRoutes)
// app.use("/api/uploads",uploadRoutes)


const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// app.get("/api", (req, res) => {
//     res.send("API is running....");
//   });

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

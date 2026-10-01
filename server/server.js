import express from "express";
import "dotenv/config";
import cors from "cors";
import sequelize, { connectDB } from "./config/db.js";
import { User, Restaurant, Reservation } from "./models/index.js";
import userRouter from "./routes/userRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js";
import reservationRouter from "./routes/reservationRoutes.js";

await connectDB();

try {
  await sequelize.sync();
  console.log("Database models synced");
} catch (error) {
  console.error(
    "Database sync failed. Please ensure MySQL is running and the credentials in server/.env are valid.",
    error.message
  );
}

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("TableBook API is running"));

app.use("/api/user", userRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/reservations", reservationRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

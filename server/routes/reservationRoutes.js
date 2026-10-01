import express from "express";
import { protect } from "../middleware/auth.js";
import {
  checkAvailability,
  createReservation,
  getBookingHistory,
  cancelReservation,
} from "../controllers/reservationController.js";

const reservationRouter = express.Router();

reservationRouter.post("/check-availability", checkAvailability);
reservationRouter.post("/", protect, createReservation);
reservationRouter.get("/history", protect, getBookingHistory);
reservationRouter.post("/:id/cancel", protect, cancelReservation);

export default reservationRouter;

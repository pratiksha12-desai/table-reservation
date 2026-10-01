import { Reservation, Restaurant } from "../models/index.js";

const countActiveReservations = async (restaurantId, reservationDate, reservationTime) => {
  return Reservation.count({
    where: { restaurantId, reservationDate, reservationTime, status: "confirmed" },
  });
};

export const checkAvailability = async (req, res) => {
  try {
    const { restaurantId, reservationDate, reservationTime } = req.body;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found" });
    }

    const activeCount = await countActiveReservations(restaurantId, reservationDate, reservationTime);
    const isAvailable = activeCount < restaurant.totalTables;

    res.json({ success: true, isAvailable, tablesLeft: Math.max(0, restaurant.totalTables - activeCount) });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const createReservation = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { restaurantId, reservationDate, reservationTime, partySize, specialRequest } = req.body;

    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found" });
    }

    const activeCount = await countActiveReservations(restaurantId, reservationDate, reservationTime);
    if (activeCount >= restaurant.totalTables) {
      return res.json({ success: false, message: "No tables available for the selected date and time" });
    }

    const reservation = await Reservation.create({
      userId, restaurantId, reservationDate, reservationTime, partySize, specialRequest,
    });

    res.json({ success: true, message: "Table reserved successfully", reservation });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getBookingHistory = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const reservations = await Reservation.findAll({
      where: { userId },
      include: [{ model: Restaurant, attributes: ["name", "city", "image", "cuisine", "address"] }],
      order: [["reservationDate", "DESC"], ["reservationTime", "DESC"]],
    });
    res.json({ success: true, reservations });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const reservation = await Reservation.findByPk(req.params.id);

    if (!reservation || reservation.userId !== userId) {
      return res.json({ success: false, message: "Reservation not found" });
    }
    if (reservation.status === "cancelled") {
      return res.json({ success: false, message: "Reservation is already cancelled" });
    }

    reservation.status = "cancelled";
    await reservation.save();

    res.json({ success: true, message: "Reservation cancelled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Reservation = sequelize.define(
  "Reservation",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    restaurantId: { type: DataTypes.INTEGER, allowNull: false },
    reservationDate: { type: DataTypes.DATEONLY, allowNull: false },
    reservationTime: { type: DataTypes.STRING, allowNull: false },
    partySize: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("confirmed", "cancelled", "completed"),
      defaultValue: "confirmed",
    },
    specialRequest: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "reservations", timestamps: true }
);

export default Reservation;

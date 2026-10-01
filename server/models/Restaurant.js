import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Restaurant = sequelize.define(
  "Restaurant",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    cuisine: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    priceForTwo: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.FLOAT, defaultValue: 4.0 },
    openingTime: { type: DataTypes.STRING, defaultValue: "11:00" },
    closingTime: { type: DataTypes.STRING, defaultValue: "23:00" },
    totalTables: { type: DataTypes.INTEGER, defaultValue: 10 },
  },
  { tableName: "restaurants", timestamps: true }
);

export default Restaurant;

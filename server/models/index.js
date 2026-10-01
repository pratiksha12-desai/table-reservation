import User from "./User.js";
import Restaurant from "./Restaurant.js";
import Reservation from "./Reservation.js";

User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });

Restaurant.hasMany(Reservation, { foreignKey: "restaurantId" });
Reservation.belongsTo(Restaurant, { foreignKey: "restaurantId" });

export { User, Restaurant, Reservation };

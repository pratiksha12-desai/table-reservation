import express from "express";
import { getRestaurants, getRestaurantById, getCities } from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

restaurantRouter.get("/meta/cities", getCities);
restaurantRouter.get("/:id", getRestaurantById);
restaurantRouter.get("/", getRestaurants);

export default restaurantRouter;

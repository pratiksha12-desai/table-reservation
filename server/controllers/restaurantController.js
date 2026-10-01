import { Restaurant } from "../models/index.js";
import { Op } from "sequelize";

export const getRestaurants = async (req, res) => {
  try {
    const { city, cuisine, search } = req.query;
    const where = {};

    if (city) where.city = city;
    if (cuisine) where.cuisine = cuisine;
    if (search) where.name = { [Op.like]: `%${search}%` };

    const restaurants = await Restaurant.findAll({ where, order: [["rating", "DESC"]] });
    res.json({ success: true, restaurants });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.json({ success: false, message: "Restaurant not found" });
    }
    res.json({ success: true, restaurant });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getCities = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({ attributes: ["city"], group: ["city"] });
    res.json({ success: true, cities: restaurants.map((r) => r.city) });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

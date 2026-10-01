import "dotenv/config";
import sequelize from "./config/db.js";
import { Restaurant } from "./models/index.js";

const restaurants = [
  { name: "Spice Route", cuisine: "North Indian", city: "Mumbai", address: "Bandra West, Mumbai",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    description: "Authentic North Indian cuisine with a modern twist, known for its butter chicken and kebabs.",
    priceForTwo: 1500, rating: 4.5, totalTables: 12 },
  { name: "Coastal Curry House", cuisine: "South Indian", city: "Bangalore", address: "Indiranagar, Bangalore",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9",
    description: "Traditional South Indian thalis, dosas, and coastal seafood specialties.",
    priceForTwo: 900, rating: 4.3, totalTables: 15 },
  { name: "The Mughal Table", cuisine: "Mughlai", city: "Delhi", address: "Connaught Place, Delhi",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    description: "Rich Mughlai delicacies served in a royal ambience, famous for biryani and kebabs.",
    priceForTwo: 2000, rating: 4.6, totalTables: 10 },
  { name: "Pune Punjabi Dhaba", cuisine: "Punjabi", city: "Pune", address: "Koregaon Park, Pune",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445",
    description: "Homestyle Punjabi food in a rustic dhaba setting.",
    priceForTwo: 700, rating: 4.2, totalTables: 18 },
  { name: "Sushi Sagar", cuisine: "Japanese", city: "Mumbai", address: "Powai, Mumbai",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    description: "Fresh sushi and Japanese fusion dishes in a contemporary setting.",
    priceForTwo: 2500, rating: 4.4, totalTables: 8 },
  { name: "Bangalore Biryani Bowl", cuisine: "Hyderabadi", city: "Bangalore", address: "Whitefield, Bangalore",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8",
    description: "Slow-cooked dum biryani served with authentic Hyderabadi flavours.",
    priceForTwo: 800, rating: 4.1, totalTables: 20 },
  { name: "Delhi Chaat Junction", cuisine: "Street Food", city: "Delhi", address: "Chandni Chowk, Delhi",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    description: "A sit-down take on Delhi's legendary street food.",
    priceForTwo: 500, rating: 4.0, totalTables: 14 },
  { name: "Pune Continental Kitchen", cuisine: "Continental", city: "Pune", address: "FC Road, Pune",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    description: "European-inspired continental dishes with a cozy cafe atmosphere.",
    priceForTwo: 1200, rating: 4.3, totalTables: 10 },
];

const seed = async () => {
  await sequelize.sync();
  const count = await Restaurant.count();
  if (count > 0) {
    console.log(`Restaurants table already has ${count} rows — skipping seed.`);
    process.exit(0);
  }
  await Restaurant.bulkCreate(restaurants);
  console.log(`Seeded ${restaurants.length} restaurants.`);
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});

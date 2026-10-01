# TableBook — Restaurant Table Reservation System

A full-stack restaurant table reservation platform built with **React.js**, **Node.js**, **Express**, and **MySQL**. Customers can browse restaurants, check real-time table availability, reserve a table, view their booking history, and cancel reservations.

## Features

- User registration & login (JWT authentication, bcrypt password hashing)
- Browse restaurants, filter by city, cuisine, and search by name
- Restaurant detail page with cuisine, address, rating, price for two
- Real-time table availability check before booking
- Table reservation with date, time slot, party size, and special requests
- Booking history — view all past and upcoming reservations
- Booking cancellation
- Fully responsive UI built with Tailwind CSS

## Tech Stack

**Frontend:** React.js, React Router, Tailwind CSS, Axios, React Hot Toast, Vite
**Backend:** Node.js, Express.js, MySQL, Sequelize ORM, JWT, bcrypt

## Project Structure

```
TableBook/
├── client/       React frontend (Vite)
└── server/       Node/Express REST API (MySQL via Sequelize)
```

## Getting Started

### 1. MySQL Database

Install MySQL or MariaDB locally (or use XAMPP on Windows/Mac), then create the database:

```sql
CREATE DATABASE tablebook;
```

Tables are created automatically the first time the server runs (via `sequelize.sync()`).

### 2. Backend

```bash
cd server
npm install
cp .env.example .env   # fill in DB credentials and JWT_SECRET
npm run seed            # loads 8 sample restaurants across Mumbai, Delhi, Bangalore, Pune
npm run dev
```

Runs on `http://localhost:4000` by default.

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173` and calls the API at the URL set in `client/.env` (`VITE_BASE_URL`).

## Environment Variables

**server/.env**
```
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tablebook
DB_USER=root
DB_PASSWORD=your_mysql_password
JWT_SECRET=your_jwt_secret
PORT=4000
```

**client/.env**
```
VITE_BASE_URL=http://localhost:4000
```

## API Overview

| Route | Method | Description |
|---|---|---|
| `/api/user/register` | POST | Register a new user |
| `/api/user/login` | POST | Login and receive a JWT |
| `/api/user/data` | GET | Get logged-in user's data |
| `/api/restaurants` | GET | Browse/filter restaurants (city, cuisine, search) |
| `/api/restaurants/:id` | GET | Get restaurant details |
| `/api/restaurants/meta/cities` | GET | List all cities with restaurants |
| `/api/reservations/check-availability` | POST | Check table availability for a date/time |
| `/api/reservations` | POST | Create a reservation |
| `/api/reservations/history` | GET | Get logged-in user's booking history |
| `/api/reservations/:id/cancel` | POST | Cancel a reservation |

## Database Schema

- **User**: id, name, email, password, phone
- **Restaurant**: id, name, cuisine, city, address, image, description, priceForTwo, rating, openingTime, closingTime, totalTables
- **Reservation**: id, userId → User, restaurantId → Restaurant, reservationDate, reservationTime, partySize, status (confirmed/cancelled/completed), specialRequest

## License

This project is open source and available for personal and educational use.


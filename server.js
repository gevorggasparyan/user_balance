const express = require("express");
const { Sequelize } = require("sequelize");
const { sequelize, User } = require("./models");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");

    // Run migrations
    await sequelize.sync({ force: true });
    console.log("Database synchronized.");

    // Create initial user
    const [user, created] = await User.findOrCreate({
      where: { id: 1 },
      defaults: { balance: 10000, version: 0 },
    });
    if (created) {
      console.log("Initial user created");
    } else {
      console.log("Initial user already exists");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();

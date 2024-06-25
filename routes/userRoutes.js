const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateBalance = require("../middleware/validateBalance");

router.put("/update-balance", validateBalance, userController.updateBalance);
router.get("/balance/:userId", userController.getBalance);

module.exports = router;

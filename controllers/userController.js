const userService = require('../services/userService');

exports.updateBalance = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const newBalance = await userService.updateUserBalance(userId, amount);
    res.json({ message: 'Balance updated', balance: newBalance });
  } catch (error) {
    if (error.message === 'UserNotFound') {
      return res.status(404).json({ message: 'User not found' });
    } else if (error.message === 'InsufficientFunds') {
      return res.status(400).json({ message: 'Insufficient funds' });
    } else if (error.message === 'BalanceConflict') {
      return res.status(409).json({ message: 'Conflict: Balance was updated by another request' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

exports.getBalance = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

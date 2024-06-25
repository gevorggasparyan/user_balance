const { User } = require("../models");

const getUserById = async (userId) => {
    return await User.findByPk(userId);
};

const updateUserBalance = async (userId, amount) => {
    const user = await getUserById(userId);

    if (!user) {
        throw new Error('UserNotFound');
    }

    if (user.balance + amount < 0) {
        throw new Error('InsufficientFunds');
    }

    const [updated] = await User.update(
        { balance: user.balance + amount },
        { where: { id: userId, version: user.version }, returning: true }
    );

    if (updated === 0) {
        throw new Error('BalanceConflict');
    }

    return user.balance + amount;
};

module.exports = {
    getUserById,
    updateUserBalance
};

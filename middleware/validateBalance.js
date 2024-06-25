module.exports = (req, res, next) => {
  const { amount } = req.body;
  if (typeof amount !== "number") {
    return res.status(400).json({ message: "Amount must be a number" });
  }
  next();
};

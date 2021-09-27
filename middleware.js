module.exports.checkCredits = (req, res, next) => {
  if (req.user.credits < 1)
    return res
      .status(403)
      .send({ error: "You do not have enough credits to do that" });
  return next();
};

module.exports.requireLogin = (req, res, next) => {
  if (!req.user)
    return res.status(401).send({ error: "You must be logged in to do that" });
  return next();
};

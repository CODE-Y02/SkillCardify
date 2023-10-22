// AUTHORIZE USER
const User = require("../../models/user");

const checkUser = async (req, res, next) => {
  try {
    const { userId } = req.decodedUser;
    const user = await User.findById(userId);

    if (!user) {
      res.status(400).json({ success: 0 });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const isDev = async (req, res, next) => {
  const allowed = new Set(["admin", "developer"]);
  try {
    const { userAccess } = req.user;
    allowed.has(userAccess) ? next() : res.status(401).json({ success: 0 });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  isDev,
  checkUser,
};

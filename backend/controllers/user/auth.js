const services = require("../../services");
const User = require("../../models/user");

// Generate both access and refresh tokens during login/signup
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id, email: user.email }, jwtSecret, {
    expiresIn: "20m",
  });
  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    refreshSecret,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

const signup = async (req, res) => {
  try {
    const { email, password, name, mobile } = req.body;
    if (!email || !password || !name || !mobile) {
      return res.status(400).json({ success: 0, message: "Invalid User Info" });
    }
    const encryptedPass = await services.password.encrypt(password);
    await User.create({
      ...req.body,
      password: encryptedPass,
    });
  } catch (error) {
    return res.status(500).json({ success: 0, message: "Internal server Err" });
  }
};

module.exports = {
  signup,
};

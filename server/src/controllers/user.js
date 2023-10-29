const services = require("../../services");
const cookie = require("cookie");

const User = require("../../models/user");

// Generate both access and refresh tokens during login/signup
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id }, jwtSecret, {
    expiresIn: "20m",
  });
  const refreshToken = jwt.sign({ id: user._id }, refreshSecret, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const signup = async (req, res) => {
  try {
    const { email, password, name, mobile } = req.body;
    if (!email || !password || !name || !mobile) {
      return res.status(400).json({ success: 0, message: "Invalid User Info" });
    }
    const encryptedPass = await services.password.encrypt(password);
    const user = await User.create({
      ...req.body,
      password: encryptedPass,
    });

    const { accessToken, refreshToken } = generateTokens(user);

    const accessTokenCookie = cookie.serialize("access_token", accessToken, {
      httpOnly: process.env.NODE_ENV === "production",
      maxAge: 1200,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    res
      .status(201)
      .setHeader("Set-Cookie", accessTokenCookie)
      .json({ refreshToken, success: 1 });
  } catch (error) {
    return res.status(500).json({ success: 0, message: "Internal server Err" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: 0, message: "Invalid User Info" });
    }
    const user = await User.findOne({ email });
    const verifyPassword = await services.password.verify(
      password,
      user.password
    );

    if (verifyPassword) {
      const { accessToken, refreshToken } = generateTokens(user);

      const accessTokenCookie = cookie.serialize("access_token", accessToken, {
        httpOnly: process.env.NODE_ENV === "production",
        maxAge: 1200,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      res
        .status(201)
        .setHeader("Set-Cookie", accessTokenCookie)
        .json({ refreshToken, success: 1 });
    }
    //else set 401
    return res.status(401).json({ success: 0, message: "wrong user info" });
  } catch (error) {
    return res.status(500).json({ success: 0, message: "Internal server Err" });
  }
};

module.exports = {
  signup,
  login,
};

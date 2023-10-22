const jwt = require("jsonwebtoken");
const cookie = require("cookie");
// const { jwtSecret, refreshSecret } = require("./config");

const jwtSecret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

const verifyToken = (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) =>
      err ? reject(err) : resolve(decoded)
    );
  });

const refreshAccessToken = (refreshToken, res) =>
  verifyToken(refreshToken, refreshSecret).then((decoded) => {
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      jwtSecret,
      { expiresIn: "20m" }
    );
    const accessTokenCookie = cookie.serialize("access_token", newAccessToken, {
      httpOnly: true,
      maxAge: 1200,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    res.setHeader("Set-Cookie", accessTokenCookie);
    return decoded;
  });

const refreshTokenMiddleware = async (req, res, next) => {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res
      .status(401)
      .json({ success: 0, message: "Access token missing" });
  }

  try {
    const decoded = await verifyToken(accessToken, jwtSecret);
    req.decodedUser = decoded;
    next();
  } catch (accessTokenError) {
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({
        success: 0,
        message: "Access token expired and refresh token missing",
      });
    }

    try {
      req.user = await refreshAccessToken(refreshToken, res);
      next();
    } catch (refreshTokenError) {
      return res.status(401).json({
        success: 0,
        message: "Both access token and refresh token are invalid or expired",
      });
    }
  }
};

module.exports = refreshTokenMiddleware;

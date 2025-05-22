import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, try again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: error.message });
  }
};

export default authUser;

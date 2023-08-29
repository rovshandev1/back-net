// exports.isAdmin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     return res
//       .status(403)
//       .json({ error: "You do not have permission to perform this action" });
//     next();
//   } else {
//     res.status(403).json({ error: "Access denied. You are not an admin." });
//   }
// };

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // Bu erda next() ni ishlatamiz
  } else {
    res.status(403).json({ error: "Access denied. You are not an admin." });
  }
};
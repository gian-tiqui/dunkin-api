export default function roleCheck(roles) {
  return (req, res, next) => {
    roles.push("user");

    if (req.user.roles.includes(...roles)) {
      next();
    } else {
      res.status(403).json({ message: "You are not authorize" });
    }
  };
}

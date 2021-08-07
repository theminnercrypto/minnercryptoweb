import User from "../models/User.js";
import { ROLES } from "../models/Role.js";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.username });
    if (user)
      return errors.push({ text: "El usuario ya existe." });
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return errors.push({ text: "El correo electrónico ya existe." });
    next();
  } catch (error) {
    errors.push({ message: error });
  }
};

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};

export { checkDuplicateUsernameOrEmail, checkRolesExisted };

import User from "../models/User";
import Role from "../models/Role";

import jwt from "jsonwebtoken";
import config from "../config";

export const renderSignUpForm = (req, res) => res.render("users/signup");

export const signUp = async (req, res) => {
  try {
    // Getting the Request Body
    const { name, email, password, confirm_password, roles } = req.body;
    const rolesFound = await Role.find({ name: { $in: roles } });
    if (password != confirm_password) {
      errors.push({ text: "Passwords do not match." });
    }
    // Creating a new User Object
    const newUser = new User({ name, email, password, roles: rolesFound.map((role) => role._id), });
      newUser.password = await newUser.encryptPassword(password);

    // checking for roles
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();
    req.flash("success_msg", "You are registered.");
    res.redirect("/login");
    // Create a token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const renderSigninForm = (req, res) => res.render("users/signin");

export const signin = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ token });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out now.");
  res.redirect("/login");
};

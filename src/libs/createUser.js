import Role from "../models/Role.js";
import User from "../models/User.js";

import bcrypt from "bcryptjs";

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const userFound = await User.findOne({ email: "admin@local" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

  if (!userFound) {
    const newUser = new User({
      name: "admin",
      email: "admin@local",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
  
    newUser.password = await newUser.encryptPassword("adminpassword");
    // create a new admin user
    await User.create(newUser);

    const admin = await newUser.save();

  console.log("¡Se ha creado un administrador!", admin);
  } else {
    console.log("¡Hay un administrador actualmente!");
  }
};

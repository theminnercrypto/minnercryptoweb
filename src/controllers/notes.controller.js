import User from "../models/User.js";

export const getUserById = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findOne(name, email);
  res.status(200).json(user);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json(user);
};


/*
export const createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (errors.length > 0) {
    res.render("sessions/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save();
    req.flash("success_msg", "Note Added Successfully");
    res.redirect("/dashboard");
  }
};

export const renderUsers = async (req, res) => {
  const userActive = await User.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("sessions/dashboard", { userActive });
};

export const renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  }
  res.render("sessions/edit-note", { note });
};

export const updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note Updated Successfully");
  res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note Deleted Successfully");
  res.redirect("/notes");
};
*/
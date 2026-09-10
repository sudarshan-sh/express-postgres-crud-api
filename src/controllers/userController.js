import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getUserByIdService,
  updateUserService,
} from "../models/userModel.js";

// standardize response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

// CREATE USER
export const createUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUser = await createUserService(name, email);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (error) {
    // next is a callback function that would activate the error handling middleware i.e., errorHandler
    next(error);
  }
};

// GET ALL USERS
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUserService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (error) {
    next(error);
  }
};

// GET USER BY ID
export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await getUserByIdService(id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (error) {
    next(error);
  }
};

// UPDATE USER
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email } = req.body;
  try {
    const updatedUser = await updateUserService(id, name, email);
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 201, "User updated successfully", updatedUser);
  } catch (error) {
    next(error);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email } = req.body;
  try {
    const deletedUser = await deleteUserService(id);
    if (!deletedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 201, "User deleted successfully", deletedUser);
  } catch (error) {
    next(error);
  }
};

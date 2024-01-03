import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import UserModel from "src/models/user";
import validationErrorParser from "src/util/validationErrorParser";

export const getUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    // if the ID doesn't exist, then findById returns null
    const user = await UserModel.findById(id);

    if (user === null) {
      throw createHttpError(404, "User not found.");
    }

    // Set the status code (200) and body (the task object as JSON) of the response.
    // Note that you don't need to return anything, but you can still use a return
    // statement to exit the function early.
    res.status(200).json(user);
  } catch (error) {
    // pass errors to the error handler
    next(error);
  }
};

export const createUser: RequestHandler = async (req, res, next) => {
  // Validate the request
  const errors = validationResult(req);
  const { name, profilePictureURL } = req.body;

  try {
    // Throw any errors
    validationErrorParser(errors);

    // create new user
    const new_user = await UserModel.create({
      name: name,
      profilePictureURL: profilePictureURL,
    });

    res.status(201).json(new_user);
  } catch (error) {
    next(error);
  }
};

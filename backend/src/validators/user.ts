import { body } from "express-validator";

const makeNameValidator = () =>
  body("name")
    .exists()
    .withMessage("Name is requried")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .notEmpty()
    .withMessage("Name cannot be empty");
const makeProfilePictureURLValidator = () =>
  body("profilePictureURL").optional().isString().withMessage("profilePictureURL must be a string");

export const createUser = [makeNameValidator(), makeProfilePictureURLValidator()];

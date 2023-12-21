import { checkSchema } from "express-validator";

export const authRegisterDto = () =>
  checkSchema({
    phoneNumber: {
      isString: true,
      notEmpty: true,
      errorMessage: "Please enter a valid phone number",
    },
    password: {
      isString: true,
      isLength: {
        options: {
          min: 5,
          max: 10,
        },
        errorMessage:
          "Please make sure that the password is atleast 5 characters",
      },
    },
  });

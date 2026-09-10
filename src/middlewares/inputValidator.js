import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .trim() // Removes accidental leading/trailing spaces
    .email() // Validates email format standard
    .lowercase() // Automatically converts input to lowercase
    .required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error)
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  next();
};

export default validateUser;

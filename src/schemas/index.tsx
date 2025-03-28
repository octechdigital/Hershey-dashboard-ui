import * as Yup from "yup";

// const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordRules = /^.{8,}$/;
export const LoginSchema = Yup.object({
  // id: Yup.string().required("Please enter your id"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string()
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Please enter your password"),
});

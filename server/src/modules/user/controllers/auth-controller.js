import { loginRepo, signUpRepo } from "../repository/auth-repository.js";
import jwt from "jsonwebtoken";

// login controller
export const loginController = async (req, res) => {
  try {
    const { credential, password } = req.body;
    if (!credential || !password) {
      return res.json({ status: false, message: "Crentials cant be null !" });
    }

    function validateCredential(input) {
      const phoneRegex =
        /^1?[ .\-/\/()+]?([ .\-/\/()]?\d{3}[ .\-/\/()]?)([ .\-/\/()]?\d{3}[[ .\-/\/()]?)\d{4}((\s){0,3})?$/;
      const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
      return phoneRegex.test(input) || emailRegex.test(input);
    }

    function validatePassword(input) {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      return regex.test(input);
    }

    // validate credential and password
    const credentialValidated = validateCredential(credential);
    const passwordValidated = validatePassword(password);

    if (!credentialValidated || !passwordValidated) {
      const errorMessages = {
        credential: credentialValidated ? "" : "Invalid Credential Format",
        password: passwordValidated ? "" : "Invalid Password Format",
      };
      return res.json({ status: false, errors: errorMessages });
    } else {
      const login = await loginRepo(credential, password);
      if (login.status) {
        const token = jwt.sign({ id: login.data }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.json({
          status: true,
          message: "User loged in success fully",
          userToken: login.data,
          errors: { credential: "", password: "" },
        });
      } else {
        res.json({
          status: false,
          errors: {
            credential: "",
            password: "Invalid Credential, Please try again!",
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

// signup controller
export const signupController = async (req, res) => {
  try {
    const { name, credential, password } = req.body;

    function validateCredential(input) {
      const phoneRegex =
        /^1?[ .\-/\/()+]?([ .\-/\/()]?\d{3}[ .\-/\/()]?)([ .\-/\/()]?\d{3}[[ .\-/\/()]?)\d{4}((\s){0,3})?$/;
      const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
      return phoneRegex.test(input) || emailRegex.test(input);
    }

    function validatePassword(input) {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      return regex.test(input);
    }

    function validateName(input) {
      const nameRegex = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/;
      return nameRegex.test(input);
    }

    const nameValidated = validateName(name);
    const credentialValidated = validateCredential(credential);
    const passwordValidated = validatePassword(password);

    if (!nameValidated || !credentialValidated || !passwordValidated) {
      const errorMessages = {
        name:nameValidated?"":"Invalid format for the name",
        credential:credentialValidated?"":"Invalid credential format",
        password:passwordValidated?"":"Invalid Password format"
      }

      return res.json({status:false,errors:errorMessages});
    } else {
      const signUp = await signUpRepo(name, credential, password);
      if (!signUp.status) {
        const errorMessages = {
          name:"",
          credential:"",
          password:"User already exist!"
        }
        return res.json({ status: false, errors:errorMessages });
      }

      return res.json({ status: true, message: "User created successfully!" });
    }
  } catch (error) {
    console.error(error);
  }
};

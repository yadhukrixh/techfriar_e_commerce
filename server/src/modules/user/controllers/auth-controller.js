import { loginRepo, signUpRepo } from "../repository/auth-repository.js";

// login controller
export const loginController = async (req, res) => {
  try {
    const { credential, password } = req.body;
    if (!credential || !password) {
      return res.json({ status: false, message: "Crentials cant be null !" });
    }

    const login = await loginRepo(credential, password);

    console.log(login);
  } catch (error) {
    console.error(error);
  }
};

// signup controller
export const signupController = async (req, res) => {
  try {
    const { name, credential, password } = req.body;
    const signUp = await signUpRepo(name, credential, password);
    if (!signUp.status) {
      return res.json({ status: false, message: "User already exist!" });
    }

    return res.json({ status: true, message: "User created successfully!" });
  } catch (error) {
    console.error(error);
  }
};

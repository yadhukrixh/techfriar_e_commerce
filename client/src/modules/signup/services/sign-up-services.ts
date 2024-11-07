import axios from "axios";
import Swal from "sweetalert2";
import { SignupErrors } from "../views";

export const userSignup = async (name: string, credential: string, password: string,setErrorMessages:(message:SignupErrors)=>void) => {
    try {
        if (!name || !credential || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Following fields can't be empty!"
            });
        }

        const response = await axios.post("http://localhost:4000/auth/signUp", { name, credential, password });
        if (response.data.status) {
            Swal.fire({
                title: "Success",
                text: "Sign Up Completed!",
                icon: "success"
            });
        }else{
            setErrorMessages({
                name:response.data.errors.name,
                credential:response.data.errors.credential,
                password:response.data.errors.password
            })
        }
    } catch (error) {
        console.error(error)
    }
}
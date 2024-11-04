import axios from "axios";
import Swal from "sweetalert2";

export const userSignup = async (name: string, credential: string, password: string) => {
    try {
        if (!name || !credential || !password) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Following fields can't be empty!"
            });
        }

        const response = await axios.post("http://localhost:4000/auth/signUp", { name, credential, password });
        console.log(response)
        if (response.data.status) {
            Swal.fire({
                title: "Success",
                text: "Sign Up Completed!",
                icon: "success"
            });
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "User already exist"
            });
        }
    } catch (error) {
        console.error(error)
    }
}
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { ErrorMessages } from "../views/login";



export const handleLogin = async (credential: string, password: string,setErrorMessages:(messages:ErrorMessages)=>void) => {
    try {
        const response = await axios.post('http://localhost:4000/auth/login', { credential, password });
        if (response.data.status) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: "User Login successfull"
            });
            Cookies.set('userToken', response.data.userToken || '', { expires: 7 / 24, path: '/' });
        }else{
            setErrorMessages(response.data.errors);
        }
    } catch (error) {
        console.error(error)
    }
}
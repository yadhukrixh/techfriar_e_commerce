import axios from "axios";


export const handleLogin = async(credential:string, password:string) => {
    try{
        console.log(credential,password);
        const response = await axios.post('http://localhost:4000/auth/login', { credential,password });
        console.log(response)
    }catch(error){
        console.error(error)
    }
}
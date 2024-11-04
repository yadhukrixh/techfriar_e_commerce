import User from "../models/user-model.js"

// login repo
export const loginRepo = async(credential,password) => {
    const user  = await User.findOne({credential:credential});
    if(user){
        if(user.password === password){
            return{
                status:true,
                message:"Password matched"
            }
        }
        return{
            status:false,
            message:"Password Mismatched!"
        }
    }
    return{
        status:false,
        message:"No user Found"
    }
}

// signup repo
export const signUpRepo = async (name,credential,password) => {
    let user = await User.findOne({credential:credential});

    if(user){
        return{
            status:false
        }
    }

    user = new User({
        name:name,
        credential,
        password:password
    })

    await user.save();
}

import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async(req, res) => {
    try{
        const {name, email, password, phone, address, answer} = req.body

        // validations
        if(!name){
            return res.send({message: 'Name is Required'})
            // res.send means data send back to client
        }
        if(!email){
            return res.send({message: 'Email is Required'})
        }
        if(!password){
            return res.send({message: 'Password is Required'})
        }
        if(!phone){
            return res.send({message: 'Phone number is Required'})
        }
        if(!address){
            return res.send({message: 'Address is Required'})
        }
        if(!answer){
            return res.send({message: 'Answer is Required'})
        }

        // check existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: 'Already registered, please login',
            })
        }

        // register user
        const hashedPassword = await hashPassword(password)

        const user = await new userModel({
            name,
            email, 
            phone, 
            address, 
            password: hashedPassword,
            answer
         }).save()
        // new userModel creates new user document

        res.status(201).send({
            success: true,
            message: "User registetration succefully",
            user,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in registration",
            error,
        })
    }
}

export const loginController = async(req, res) => {
    try{    
        const {email, password} = req.body;

        //validations
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: 'Email or Password is wrong',
            })
        }

        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).send({
                success: false,
                message: 'Email is not registered',
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'password is incorrect',
            })
        }

        // JWT.sign generates Json web token
        const token = await JWT.sign({_id: user.id}, process.env.JWT_SECRET, {expiresIn: '7d',})

        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user: {
                _id: user._id,
                name: user.name,    
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while login',
            error,
        })
    }
}

// forgot password controller

export const forgotPasswordController = async(req, res) => {
    try{
        const {email, newPassword, answer} = req.body;

        if(!email){
            res.status(400).send({message: 'Email is Required'})
        }

        if(!answer){
            res.status(400).send({message: 'Answer is required'})
        }

        if(!newPassword){
            res.status(400).send({message: 'New Password is Required'})
        }

        // check
        const user = await userModel.findOne({email, answer})

        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer'
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashed});

        res.status(200).send({
            success: true,
            message: 'Password Reset Succefully',
        })
        

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server Error',
            error,
        })
    }
}



export const testController = (req, res) => {
    res.send('protected route')
}



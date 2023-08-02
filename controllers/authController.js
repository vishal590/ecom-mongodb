import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async(req, res) => {
    try{
        const {name, email, password, phone, address} = req.body

        // validations
        if(!name){
            return res.send({error: 'Name is Required'})
            // res.send means data send back to client
        }
        if(!email){
            return res.send({error: 'Email is Required'})
        }
        if(!password){
            return res.send({error: 'Password is Required'})
        }
        if(!phone){
            return res.send({error: 'Phone number is Required'})
        }
        if(!address){
            return res.send({error: 'Address is Required'})
        }

        // check existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: true,
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
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
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

export const testController = (req, res) => {
    res.send('protected route')
}

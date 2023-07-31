import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

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

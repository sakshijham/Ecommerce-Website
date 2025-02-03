import { Request, Response, RequestHandler } from "express";
// import { AppDataSource } from "../app";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt, {JwtPayload} from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { AppDataSource } from "../lib/db/db";



export const handleUserSignUp: RequestHandler = async (req:Request, res:Response) => {
  try {
  //  console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
    const { firstName, lastName, email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);

   
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ msg: "All fields are required" });
      return; 
    }

  
    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ msg: "User already exists, please choose a different email" });
      return;
    }

   
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

   
    const newUser = userRepo.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

   
    await userRepo.save(newUser);
    const secretKey = process.env.JWT_SECRET_KEY;
    if(!secretKey){
        res.status(400).send({
            msg: "Secret key not found",
          });
          return;
    }
    const token = jwt.sign({id:newUser.id},secretKey)
 
    res.status(201).send({
      msg: "User registered successfully",
      token
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ msg: "An error occurred during registration" });
  }
};


export const handleUserLogin: RequestHandler = async (req:Request , res:Response) => {
  try {
    const { email, password } = req.body;

    const userRepo = AppDataSource.getRepository(User);

   
    if (!email || !password) {
      res.status(400).json({ msg: "All fields are required" });
      return;
    }

   
    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }

   
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ msg: "Invalid credentials" });
      return;
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if(!secretKey){
        res.status(400).send({
            msg: "Secret key not found",
          });
          return;
    }
    const token = jwt.sign({id:user.id , role:user.role},secretKey)

    res.status(200).json({
      msg: "Login successful",
      userId:user.id,
      role:user.role,
      token
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ msg: "An error occurred during login" });
  }
};



export const forgetPassword : RequestHandler = async(req:Request,res:Response)=>{

   // console.log('forget password ------------------------------------')
    try {
        const {email} = req.body;
        console.log('Email****************',email)
        const userRepo = AppDataSource.getRepository(User)

        if(!email){
           res.status(400).send({message:"Please provide email"});
           return; 
        }
        
        const checkUser = await userRepo.findOne({where:{email}});

        if(!checkUser){
            res.status(400).send({message:"User not found please register"});
            return;
        }

      
        const secretKey = process.env.JWT_SECRET_KEY;
        if(!secretKey){
            res.status(400).send({
                msg: "Secret key not found",
              });
              return;
        }
        const token = jwt.sign({id:checkUser.id},secretKey);

        const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            auth:{
                user:process.env.MY_GMAIL,
                pass:process.env.MY_PASSWORD
            },
        })

        const receiver = {
            from : process.env.FROM_GMAIL,
            to :email,
            Subject : "Password Reset Request",
            text : `Click on this link to generate your new password ${process.env.CLIENT_URL}/reset-password/${token}`
        }

        await transporter.sendMail(receiver);

        res.status(200).send({msg:"Password reset link send successfully on your gmail account"})
        return;
       
    } catch (error) {
        console.log("Error",error);
        res.status(500).send({message:"Something went wrong"});
        return;
    }
}


export const getUsers :RequestHandler = async(req:Request,res:Response)=>{
  const userRepo = AppDataSource.getRepository(User);

  try {
    const users = await userRepo.find();
    console.log(users);

    res.status(200).json(users);
    return;

  } catch (error) {
    console.log('Error during fetching users');
    res.status(500).json({msg:"Internal Server Error"});
  }
}


 

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log('token******************',token);
    console.log('password***************',password);

    if (!password) {
       res.status(400).send({ msg: "Please provide a password" });
       return;
    }

    const secretKey = process.env.JWT_SECRET_KEY;
    if (!secretKey) {
       res.status(500).send({ msg: "Secret key not found" });
       return;
    }

   
    const decode = jwt.verify(token, secretKey);
    console.log('decode************',decode);
    
    if (typeof decode !== "object" || !("id" in decode)) {
       res.status(400).send({ msg: "Invalid or expired token" });
       return;
    }

    const userId = (decode as JwtPayload).id;

   
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOneBy({ id: userId });

    if (!user) {
       res.status(404).send({ msg: "User not found" });
       return;
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

   
    await userRepo.save(user);

    res.status(200).send({ msg: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).send({ msg: "Something went wrong" });
  }
};



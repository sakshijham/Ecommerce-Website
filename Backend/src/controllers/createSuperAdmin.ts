import { Request, RequestHandler, Response } from "express";
import { AppDataSource } from "../lib/db/db";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createSuperAdmin : RequestHandler = async(req:Request,res:Response)=>{
    try {
        const userRepo = AppDataSource.getRepository(User);

        const existingUser = await userRepo.findOne({where:{role:'superadmin'}});
    
        if(!existingUser){
            const hashedPassword = await bcrypt.hash('123456',10);
            const superAdmin = userRepo.create({
                firstName:'Super',
                lastName:'Admin',
                email:'sakshijhamnani0@gmail.com',
                password:hashedPassword,
                role:'superadmin'
            })
    
            await userRepo.save(superAdmin);
    
             const secretKey = process.env.JWT_SECRET_KEY;
                if(!secretKey){
                    res.status(400).send({
                        msg: "Secret key not found",
                      });
                      return;
                }
                const token = jwt.sign({id:superAdmin.id},secretKey)

                res.status(201).json({
                    msg:"user registered successfully",
                    token});
            }

            

        
    } catch (error) {
        console.log('Error during super admin creation');
        res.status(500).json({msg:"Internal server error"})
    }

  
    
}



export const AssignRole : RequestHandler = async(req:Request,res:Response)=>{
    const {userId} = req.params;
    const {role} = req.body;

    if(!['admin','user'].includes(role)){
        res.status(400).json({msg:'Invalid role'});
        return;
    }
    try {

       const userRepo = AppDataSource.getRepository(User)

       const user =await userRepo.findOne({where:{id:userId}});

       if(!user){
         res.status(404).json({msg:"User not found"});
         return;
       }
       user.role = role;
       await userRepo.save(user);

       res.status(200).json({msg:"Role updated"})

        
    } catch (error) {
       console.log('Error during assigning role');
       res.status(500).json({msg:"Internal Server Error"}); 
    }
}
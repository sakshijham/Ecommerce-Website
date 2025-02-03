import { NextFunction,Request,Response } from "express"
import { JwtPayload } from "jsonwebtoken";

interface JwtPayloadWithRole extends JwtPayload{
    role : 'admin' | 'user' | 'superadmin';
}

export const authorizeRoles = (...allowedRoles:('admin' | 'user' | 'superadmin')[]) =>{

    return (req:Request,res:Response,next:NextFunction):void =>{
        const user = req.user as JwtPayloadWithRole
    console.log('User**********************8888',user);
    console.log("Allowed roles",allowedRoles)
    
        if (!user || !allowedRoles.includes(user.role )) {
             res.status(403).json({ message: "Access denied" });
             return;
          }
              next();
    }

}
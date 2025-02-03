import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization ;

    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "No token, authorization denied" });
        return; 
    }

    
    const token = authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
    }

    try {
        const secretKey = process.env.JWT_SECRET_KEY;

        if (!secretKey) {
            res.status(500).json({ message: "Internal server error: Secret key not found" });
            return;
        }

      
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        console.log("The decoded user is", req.user);
        //output :-   The decoded user is { id: 1, role: 'user', iat: 1737698472 }
     
        next();
    } catch (error) {
        res.status(400).json({ message: "Token is not valid" });
    }
};

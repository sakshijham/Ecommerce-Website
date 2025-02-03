import { Request, RequestHandler, Response } from "express";
// import { AppDataSource } from "../app";
import { User } from "../entities/User";
import { Cart } from "../entities/Cart";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { AppDataSource } from "../lib/db/db";


export const OrderNow : RequestHandler= async(req:Request,res:Response)=>{
     try {
        const {userId} = req.params;

        const userRepo = AppDataSource.getRepository(User);
        const cartRepo = AppDataSource.getRepository(Cart);
        const orderRepo = AppDataSource.getRepository(Order);
        const orderItemRepo = AppDataSource.getRepository(OrderItem);

        const user = await userRepo.findOne({where:{id:userId}});

        if(!user){
            res.status(404).json({msg:"user not found"});
            return;
        }

        const cartItems = await cartRepo.find({
            where:
            {user:{id:userId}},
            relations:["product","user"]
        });

        if(cartItems.length === 0){
           res.status(200).json({msg:"cart is empty"});
           return;
        }else{
            let totalAmount=0;
            const orderItems : OrderItem[]= cartItems.map((cartItem)=>{
                totalAmount+=cartItem.product.price*cartItem.quantity;
                

                return orderItemRepo.create({
                    product: cartItem.product,
                    quantity: cartItem.quantity,
                    price: cartItem.product.price,
                });
            })

            //create the order
            const newOrder = orderRepo.create({
                user,
                orderItems,
                totalAmount,
              //  Status:'pending'

            })

            await orderRepo.save(newOrder);

            //clear the user cart after placing the order
          //
          //   await cartRepo.delete({user:{id:userId}});

            res.status(201).json({
                msg :"Order placed successfully",
                newOrder
            });
            return;
        }

        
} catch (error) {
        console.log('Error',error);
        res.status(500).json({msg:"Internal server error"});
        return;
     }
}


export const getOrders:RequestHandler = async(req:Request,res:Response)=>{
    try {
        const {userId} = req.params;

        const userRepo = AppDataSource.getRepository(User);
        const orderRepo = AppDataSource.getRepository(Order);
        const orderItemRepo = AppDataSource.getRepository(OrderItem);

        const user =await userRepo.findOne({where:{id:userId}});
        console.log('users88888888',user)
        if(!user){
            res.status(404).json({msg:"user not found"});
            return;
        }


        const order = await orderRepo.find({where:{
            user:{id:userId},
         }, relations:["user","orderItems"]
        })

        res.status(200).json({msg:"Orders",order});
        return;
    } catch (error) {
       console.log('Error',error);
       res.status(500).json({msg:"Internal server error"}); 
    }
}
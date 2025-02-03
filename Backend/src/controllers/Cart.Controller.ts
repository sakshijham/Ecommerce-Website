import { Request, RequestHandler, Response } from "express";
// import { AppDataSource } from "../app";
import { User } from "../entities/User";
import { Product } from "../entities/Product";
import { Cart } from "../entities/Cart";
import { AppDataSource } from "../lib/db/db";

export const addToCart : RequestHandler = async(req:Request,res:Response)=>{
    try {

        const userRepo = AppDataSource.getRepository(User);
        const productRepo = AppDataSource.getRepository(Product);
        const cartRepo = AppDataSource.getRepository(Cart);

        const {userId,productId,quantity} = req.body;

        if(!userId || !productId || !quantity){
            res.status(400).json({msg:"All fields are required"});
            return;
        }

        const user = await userRepo.findOne({where:{id:userId}});
        if(!user){
            res.status(404).json({msg:"User not found"});
        }

        const product = await productRepo.findOne({where:{productId:productId}});
        if(!product){
            res.status(404).json({msg:"Product not found"});
        }

        let cartItem = await cartRepo.findOne({
            where : {user : {id:userId}, product : {productId:productId}},
            relations:["user","product"],
        });

        if(cartItem){
            cartItem.quantity += Number(quantity);
            await cartRepo.save(cartItem);
            res.status(200).json({msg:"Cart updated successfully" , data:cartItem});
        }else{
            const newCartItem = cartRepo.create({
                user:{id:userId},
                product:{productId:productId},
                quantity:quantity
            })

           await cartRepo.save(newCartItem);
           const cartData = await cartRepo.findOne({
            where : {user : {id:userId}, product : {productId:productId}},
            relations:["user","product"],
           })
            res.status(201).json({msg:"Product added to cart", data:cartData});
            return;
        }

       
        
    } catch (error) {
        console.log("Error adding to cart");
        res.status(500).json({msg:"Internal server error"})
        return;
    }
}


export const fetchCartData : RequestHandler = async(req:Request,res:Response)=>{
     try {

        const {userId} = req.params;

        const userRepo = AppDataSource.getRepository(User);
        const cartRepo = AppDataSource.getRepository(Cart);

        const user = await userRepo.findOne({where:{id:userId}});
        if(!user){
            res.status(404).json({msg:"User not found"});
            return;
        }

        const cartItems = await cartRepo.find({
            where:{user:{id:userId}},
            relations:["user","product"],
        })

        if(!cartItems){
            res.status(200).json({msg:"Cart is empty"});
            return;
        }

        res.status(200).json(cartItems);
        return;


     } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
        return;
     }
}


export const clearCartByUserId : RequestHandler = async (req:Request,res:Response)=>{
    try {
        const {userId} = req.params;

        const userRepo = AppDataSource.getRepository(User);
        const cartRepo = AppDataSource.getRepository(Cart);


        const user = await userRepo.findOne({where:{id:userId}});
        if(!user){
            res.status(404).json({msg:"User not found"});
            return;
        }

        await cartRepo.delete({user:{id:userId}});

        res.status(200).json({msg:"Clear cart successfully"});
        return;
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal Server Error"});
        return
    }
}

export const DeleteCartItemByUserId : RequestHandler = async(req:Request,res:Response)=>{
    try {
        const cartId = Number(req.params.cartId);
        const userId = (req.params.userId);


        const userRepo = AppDataSource.getRepository(User);
        const cartRepo = AppDataSource.getRepository(Cart);

        const user = await userRepo.findOne({where:{id:(userId)}});
        if(!user){
            res.status(404).json({msg:"User not found"});
            return;
        }

        const cartItem = cartRepo.findOne({
            where:{
                user:{id:userId},
                cartId:cartId
            }
        })

        if(!cartItem){
            res.status(404).json({msg:"cart item not found for this user"});
        }

        await cartRepo.delete({
            cartId:cartId,
            user:{id:userId}
        })

        res.status(200).json({msg:"Cart item deleted successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }
}


export const plusOneQuantity : RequestHandler = async(req:Request,res:Response)=>{
    try {

        // const {userId , cartId} =req.params;

        const userId = req.body.userId;
        const cartId = Number(req.body.cartId);

        const cartRepo = AppDataSource.getRepository(Cart)

        const cartItem = await cartRepo.findOne({
            where: { cartId: cartId, user: { id: userId } },
            relations: ["user", "product"]
        })

        if(!cartItem){
            res.status(404).json({msg:"cart Item not found"})
        }
        else{
         
        console.log(cartItem.cartId)
        console.log(cartItem?.quantity)

        cartItem.quantity=cartItem.quantity+1;

        cartRepo.save(cartItem);

      //  console.log(cartItem);
        res.status(200).json({msg :"Cart updated successfully" , data:cartItem});
        return;
        }
        
    } catch (error) {
       console.log('Error',error);
       res.status(500).json({msg:"Internal server error"}) 
    }
}

export const minusOneQuantity : RequestHandler = async(req:Request,res:Response)=>{
    try {
        const userId = req.body.userId;
        const cartId = Number(req.body.cartId);

        const cartRepo = AppDataSource.getRepository(Cart);

        const cartItem = await cartRepo.findOne({
            where:{ cartId:cartId,user:{id:userId}},
            relations:["user","product"]
        })

        if(!cartItem){
            res.status(404).json({msg:'cart item not found'});
            return;
        }else{

            if(cartItem.quantity>1){
              cartItem.quantity=cartItem.quantity-1;
              cartRepo.save(cartItem);

              res.status(200).json({msg:"cart updated successfully" ,data:cartItem});
              return;
            }
            
        }


    } catch (error) {
        console.log('Error',error);
        res.status(500).json({msg:"Internal server error"});
        return;
    }
}


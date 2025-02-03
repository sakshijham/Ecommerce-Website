import { Request, RequestHandler, Response } from "express";
// import { AppDataSource } from "../app";
import { Product } from "../entities/Product";
import { AppDataSource } from "../lib/db/db";


export const getProducts : RequestHandler = async(req:Request,res:Response)=>{
    try {
       const productRepo = AppDataSource.getRepository(Product);

       const products = await productRepo.find();
       console.log(products);

       res.status(200).json(products);
       return;
    } catch (error) {
        res.status(500).json({ msg: "An error occurred while retrieving products"})
    }
}


export const AddProducts : RequestHandler = async(req:Request,res:Response)=>{
    try {
        const productRepo = AppDataSource.getRepository(Product);

        const {title,description,price,imageUrl,category} = req.body;

        if(!title || !description || !price || !imageUrl || !category){
           res.status(400).json({msg:"All fields are required"});
           return; 
        }

        const newProduct = productRepo.create({
            title,
            description,
            price,
            imageUrl,
            category
        })


        await productRepo.save(newProduct);

        res.status(201).json({msg:"New product created"});
    } catch (error) {
        console.log('Error during new product creation',error);
        res.status(500).json({msg:"An error occured during product creation"});

    }
}


export const DeleteProduct : RequestHandler = async(req:Request,res:Response)=>{
    try {
        const productRepo = AppDataSource.getRepository(Product);

        const {productId} = req.params;

        if(!productId){
            res.status(404).json({msg:"ProductId is required"});
            return;
        }

        const product = await productRepo.findOne({where:{productId:productId}})

        if(!product){
            res.status(404).json({msg:"Product not found"});
            return;
        }

        await productRepo.delete({productId:productId})

        res.status(200).json({msg:"Product Item deleted"});
        return;


    } catch (error) {
       console.log('Error',error);
       res.status(500).json({msg:"Internal server error"});
    }
}

export const UpdateProduct : RequestHandler = async(req:Request,res:Response)=>{
    try {
        const productRepo = AppDataSource.getRepository(Product);
        const {productId} = req.params;

        if(!productId){
            res.status(404).json({msg:"ProductId is required"});
            return;
        }

        const product = await productRepo.findOne({where:{productId:productId}})

        if(!product){
            res.status(404).json({msg:"Product not found"});
            return;
        }

        const {title,description,price,imageUrl,category} = req.body;

        if(!title || !description || !price || !imageUrl || !category){
            res.status(400).json({msg:"All fields are required"});
            return;
        }
  

        //update the product with new values
        product.title = title;
        product.description = description;
        product.price = price;
        product.imageUrl = imageUrl;
        product.category = category;

        await productRepo.save(product);

        res.status(200).json({msg:"Product updated successfully"});

      
    } catch (error) {
        console.error('Error while updating product',error);
        res.status(500).json({msg:"Internal server error"});

    }
}


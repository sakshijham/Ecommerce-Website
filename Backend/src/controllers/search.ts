import { Request, RequestHandler, Response } from "express";
import { AppDataSource } from "../lib/db/db";
import { Product } from "../entities/Product";
import { Like, MoreThanOrEqual } from "typeorm";

export const searchProducts: RequestHandler = async (req: Request, res: Response) => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const searchKey = req.params.key;

    
    const result = await productRepo.find({
      where: {
        title: Like(`%${searchKey}%`), 
      },
    });

    res.send(result);
  } catch (error) {
    console.error("Error searching products", error);
    res.status(500).send({ error: "An error occurred while searching products" });
  }
};


export const filterBasedOnCategory : RequestHandler= async(req:Request,res:Response)=>{
    try {
        const productRepo = AppDataSource.getRepository(Product);
        const category = req.params.category;

        const result = await productRepo.find({where:{category:category}});

        res.send(result);

    } catch (error) {
        console.error("Error filtering products",error);
        res.status(500).send({error:"An error occured while filtering products"});
    }
}

export const filterBasedOnPrice : RequestHandler = async(req:Request,res:Response)=>{
    try {
        const productRepo = AppDataSource.getRepository(Product);
        console.log(req.params,'req.paramsssssssssssssssssssss')
        const filterPrice = Number(req.params.filterPrice);
        console.log(filterPrice,'filterPriceeeeeeeeeeeeeeeeeeeeeeeee');




        
        if(isNaN(filterPrice)){
            res.status(400).json({msg:"Invalid Price"});
        }

        const result = await productRepo.find({
            where:{
                price:MoreThanOrEqual(filterPrice)
            }
        })
        console.log(result, 'Products filtering by priceeeeeeeeeeeeeeeeeeeeeeeeee')

         res.status(200).json(result)
         return;
    } catch (error) {
        console.error("Error filtering products by price",error);
        res.status(500).json({msg:"Internal server error"})
    }
}
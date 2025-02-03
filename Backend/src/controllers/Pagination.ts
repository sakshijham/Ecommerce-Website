import { Request, RequestHandler, Response } from "express";
import { AppDataSource } from "../lib/db/db";
import { Product } from "../entities/Product";

export const pagination: RequestHandler = async (req: Request, res: Response) => {
    try {
        const productRepo = AppDataSource.getRepository(Product);
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        if (page < 1 || limit < 1) {
             res.status(400).json({ msg: "Page and limit must be greater than 0" });
             return;
        }

        const [products, totalProducts] = await productRepo.findAndCount({
            skip: (page - 1) * limit,  //Skipping the previuos pages records
            take: limit,      //fetching only the required number of products
          
        });

        //products:- An array containing the paginated list of product entities let suppose limit is 5 then It will have 5 products
        //totalProducts:- The total number of products in the database
        res.json({
            totalProducts,
            pageCount: Math.ceil(totalProducts / limit),
            next: totalProducts > page * limit ? { page: page + 1 } : null,
            prev: page > 1 ? { page: page - 1 } : null,
            result: products,
        });
    } catch (error) {
        console.error("Error fetching paginated products", error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

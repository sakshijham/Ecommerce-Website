import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";


@Entity()
export class Cart{
   @PrimaryGeneratedColumn()
   cartId:number;

   @ManyToOne(()=>User, (user)=>user.cart,{onDelete:'CASCADE'})
   user:User

   @ManyToOne(()=>Product , (product)=>product.category,{onDelete:"CASCADE"})
   product:Product;

   @Column()
   quantity:number

}
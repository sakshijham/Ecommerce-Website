import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";

@Entity()
export class User{
   @PrimaryGeneratedColumn()
   id:string;

   @Column()
   firstName : string

   @Column()
   lastName : string

   @Column()
   email : string

   @Column()
   password : string

   @Column({type:'varchar',default:'user'})
   role : 'user' | 'admin' | 'superadmin'

   @OneToMany(()=>Cart,(cart)=>cart.user,{cascade:true,eager:true})
   cart : Cart[]

   @OneToMany(()=>Order, (order)=>order.user,{cascade:true})
   orders:Order[];
}


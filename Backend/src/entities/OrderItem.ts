import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";


@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=> Order, (order)=>order.orderItems, {onDelete:"CASCADE"})
    order : Order
    
    @ManyToOne(()=> Product,{onDelete:"CASCADE",eager:true})
    product:Product

    @Column()
    quantity:number;

    @Column({type:"decimal",precision:10,scale:2})
    price:number
}















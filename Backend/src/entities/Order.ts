import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";
import { Payment } from "./payment";


@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    orderId: number;
    
    @ManyToOne(()=>User, (user)=>user.orders , {onDelete:"CASCADE",eager:true})
    user : User;

    @OneToMany(()=>OrderItem, (orderItem)=>orderItem.order,{cascade:true,eager:true})
    orderItems:OrderItem[];

    @OneToOne(()=>Payment, payment=>payment.order)
    payment:Payment;

    @Column({type:"decimal",precision:10,scale:2})
    totalAmount :number;

    // @Column({type:'varchar',default:'pending'})
    // Status : string;
 
    @CreateDateColumn()
    createdAt:Date;

}
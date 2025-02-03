import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";




@Entity()
export class Payment{
    @PrimaryGeneratedColumn()
    paymentId:string;

    @Column({nullable:false})
    razorpay_order_id : string;
    
    @Column({nullable:false})
    razorpay_payment_id : string;

    @Column({nullable:false})
    razorpay_signature : string;

    @OneToOne(()=>Order,(order)=>order.payment,{onDelete:"CASCADE"})
    @JoinColumn({ name: "orderId" })
    order:Order

}

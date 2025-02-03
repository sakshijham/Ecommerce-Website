import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./Cart";


@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    productId: string;

    @Column({type: 'varchar'})
    title:string

    @Column({type:'text'})
    description:string;

    @Column({type:'decimal',precision:10,scale:2})
    price:number

    @Column({type:'text'})
    imageUrl:string

    @Column({type: 'varchar'})
    category:string

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @OneToMany(()=>Cart , (cart)=>cart.product, {cascade:true,eager:true})
    cart : Cart[]
}
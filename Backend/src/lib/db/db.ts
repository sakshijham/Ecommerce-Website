import { DataSource } from "typeorm";
import { Cart } from "../../entities/Cart";
import { Order } from "../../entities/Order";
import { OrderItem } from "../../entities/OrderItem";
import { Product } from "../../entities/Product";
import { User } from "../../entities/User";
import { Payment } from "../../entities/payment";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "my_user",
    password: "new_password",
    database: "Ecommerce1",
    entities: [User, Product, Order,Cart,OrderItem,Payment], // Explicitly list entities
    synchronize: true,
    logging: true,
});

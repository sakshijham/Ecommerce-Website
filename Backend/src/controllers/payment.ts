import { RequestHandler,Request,Response } from "express";
import { instance } from "../app";
import crypto from "crypto"
import { Payment } from "../entities/payment";
import { AppDataSource } from "../lib/db/db";
import { User } from "../entities/User";
import { Cart } from "../entities/Cart";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";


//It will create order

//The checkout controller is responsible for creating an order on Razorpay before the payment is 
// processed. It generates an order ID that the frontend uses to initiate the payment process.
export const checkout: RequestHandler = async (req: Request, res: Response) => {
    console.log('Request Body in checkout handler',req.body);
    const roundedAmount = Math.round(Number(req.body.amount * 100)); 

    try {
        const options = {
            amount: roundedAmount,
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Order creation failed" });
    }
};



// export const paymentVerification : RequestHandler = async(req:Request,res:Response)=>{
//     const razorpayApiKey = process.env.RAZORPAY_API_KEY || "rzp_test_wRzSkjCSAlsBRG" ;
//     const razorpayApiSecret = process.env.RAZORPAY_API_SECRET || "uv2oh7oirqLSjZOO3tUgbzKt";

//     try {
//         const {razorpay_order_id, razorpay_payment_id,razorpay_signature,userId} = req.body;

//         const body = razorpay_order_id + "|" + razorpay_payment_id;
    
//         const expectedSignature = crypto.createHmac('sha256',razorpayApiSecret)
//         .update(body.toString())
//         .digest('hex');
    
//         const isAuthentic = expectedSignature === razorpay_signature;
    
//         if(isAuthentic){
//             const userRepo = AppDataSource.getRepository(User);
//             const cartRepo = AppDataSource.getRepository(Cart)
//             const paymentRepo = AppDataSource.getRepository(Payment);
//             const orderRepo = AppDataSource.getRepository(Order);
//             const orderItemRepo = AppDataSource.getRepository(OrderItem);
    
//            const user = await userRepo.findOne({where:{id:userId}});
    
//            if(!user){
//             res.status(400).json({msg:"User not found"});
//             return;
//            }
//            console.log('user******************',user)
    
//            const cartItems = await cartRepo.find({
//             where: { user: { id: userId } },
//             relations: ["product", "user"]
//         });
        
    
//             if(cartItems.length===0){
//                 res.status(400).json({msg:"cart is empty"})
//                 return;
//             }
    
//             let totalAmount =0;
//             const orderItems : OrderItem[] = cartItems.map((cartItem)=>{
//                 totalAmount+=cartItem.product.price*cartItem.quantity;
                    
    
//                 return orderItemRepo.create({
//                     product: cartItem.product,
//                     quantity: cartItem.quantity,
//                     price: cartItem.product.price,
//                 });
//             })

//             if(orderItems.length===0){
//                 res.status(400).json({msg:"Order Items are blank"})
//             }

//             console.log('orderItems **************',orderItems)
    
          
//             const newOrder =  orderRepo.create({
//                 user:user,
//                 orderItems,
//                 totalAmount,
    
                
    
//             })

           

//             // try {
            
                
//             // } catch (saveError) {
//             //    console.error('Error saving order',saveError);
//             //    throw saveError; 
//             // }
    
         
//             const savedOrder =  await orderRepo.save(newOrder);
//             console.log('new order ***************',savedOrder)
//             const newPayment = paymentRepo.create({
//                 razorpay_order_id,
//                 razorpay_payment_id,
//                 razorpay_signature,
//                 order:savedOrder
    
//             });

//             console.log("Saving Payment******************",newPayment);
//             try {
//                 await paymentRepo.save(newPayment);
//                 console.log('payment saved successfully ^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&0');

//             } catch (paymentError) {
//                 console.error("Error saving payment:88888888888888888888888888888888888888888888888888888888888888888888888888", paymentError);
//                 throw paymentError; 
//             }
    
            
    
//             //clear cart after placing order
//             try {
//                 await cartRepo.delete({user:{id:userId}});
//             } catch (cartClearError) {
//                 console.error("Error clearing cart:", cartClearError);
//                 throw cartClearError;
//             }
          
    
            
    
//             // console.log('New payment************************',newPayment);
    
//            res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
//         }else{
//          res.status(400).json({
//             success:false,
//             msg:"Invalid Signature"
//          })
//         }
    
        
//     } catch (error) {
//         console.error("Error during payment verification",error);
//         res.status(500).json({msg:"Internal Server Error"})
//     }

    
   
    
// }
export const paymentVerification2 : RequestHandler = async(req:Request, res:Response) => {
    const razorpayApiKey = process.env.RAZORPAY_API_KEY || "rzp_test_wRzSkjCSAlsBRG";
    const razorpayApiSecret = process.env.RAZORPAY_API_SECRET || "uv2oh7oirqLSjZOO3tUgbzKt";

    try {
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature, userId} = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
    
        const expectedSignature = crypto.createHmac('sha256', razorpayApiSecret)
            .update(body.toString())
            .digest('hex');

            console.log('expected signature', expectedSignature);
            console.log('razorpay signature',razorpay_signature);
    
        const isAuthentic = expectedSignature === razorpay_signature;
    
        if (isAuthentic) {
            const userRepo = AppDataSource.getRepository(User);
            const cartRepo = AppDataSource.getRepository(Cart);
            const paymentRepo = AppDataSource.getRepository(Payment);
            const orderRepo = AppDataSource.getRepository(Order);
            const orderItemRepo = AppDataSource.getRepository(OrderItem);
    
            const user = await userRepo.findOne({ where: { id: userId } });
    
            if (!user) {
                res.status(400).json({ msg: "User not found" });
                return;
            }
    
            const cartItems = await cartRepo.find({
                where: { user: { id: userId } },
                relations: ["product", "user"]
            });
    
            if (cartItems.length === 0) {
                res.status(400).json({ msg: "Cart is empty" });
                return;
            }
    
            let totalAmount = 0;
            const orderItems: OrderItem[] = cartItems.map((cartItem) => {
                totalAmount += cartItem.product.price * cartItem.quantity;
    
                return orderItemRepo.create({
                    product: cartItem.product,
                    quantity: cartItem.quantity,
                    price: cartItem.product.price,
                });
            });
    
            if (orderItems.length === 0) {
                res.status(400).json({ msg: "Order Items are blank" });
                return;
            }
    
            // Create and save the order
            const newOrder = orderRepo.create({
                user: user,
                orderItems,
                totalAmount,
            });

            const savedOrder = await orderRepo.save(newOrder); 
            console.log('Order saved successfully:', savedOrder);

            // Create and save the payment
            const newPayment = paymentRepo.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                order: savedOrder, // Link to saved order
            });

            try {
               const savedPayment = await paymentRepo.save(newPayment); // Save payment
                console.log('Payment saved successfully!'  , savedPayment);
            } catch (paymentError) {
                console.error("Error saving payment:", paymentError);
               
            }
    
            // Clear cart after placing order

            if (user) {
                try {
                    await cartRepo.delete({ user: user }); 
                } catch (cartClearError) {
                    console.error("Error clearing cart:", cartClearError);
                   
                }
            } else {
                console.error("User not found");
                res.status(400).json({ msg: "User not found" });
            }
    
            // Redirect after successful payment
            res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
        } else {
            res.status(400).json({
                success: false,
                msg: "Invalid Signature"
            });
        }
    } catch (error) {
        console.error("Error during payment verification", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

// export const paymentVerification1 : RequestHandler = async (req:Request,res:Response)=>{
//     const razorpayApiSecret = process.env.RAZORPAY_API_SECRET || "uv2oh7oirqLSjZOO3tUgbzKt";


//     const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
//     const paymentRepo = AppDataSource.getRepository(Payment);

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto.createHmac('sha256',razorpayApiSecret).update(body.toString()).digest('hex');

//     console.log('sign received',razorpay_signature);
//     console.log('sign generated', expectedSignature);


//     const isAuthentic = expectedSignature === razorpay_signature;

//     if(isAuthentic){

//         const newPayment =  paymentRepo.create({
//            razorpay_order_id,
//            razorpay_payment_id,
//            razorpay_signature
//         })
//         res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);


//     }else{
//         res.status(400).json({
//             success:false
//         })
//     }
// }
// export const paymentVerification1 :RequestHandler = async (req: Request, res: Response) => {
//     const razorpayApiSecret = process.env.RAZORPAY_API_SECRET || "uv2oh7oirqLSjZOO3tUgbzKt";
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
//         const orderId = req.body.orderId; 
        
//         const orderRepo = AppDataSource.getRepository(Order);
//         const order = await orderRepo.findOne({ where: { orderId } });

//         if (!order) {
//              res.status(404).json({ msg: "Order not found" });
//              return;
//         }

       
//         const body = razorpay_order_id + "|" + razorpay_payment_id;
//         const expectedSignature = crypto.createHmac("sha256",razorpayApiSecret)
//             .update(body)
//             .digest("hex");
//             console.log(expectedSignature);
//             console.log(razorpay_signature);

//         if (expectedSignature === razorpay_signature) {
//             order.Status = "success"; 
//             await orderRepo.save(order);

//              res.status(200).json({ msg: "Payment successful", success: true });
//              return
//         } else {
//             order.Status = "fail"; 
//             await orderRepo.save(order);

//              res.status(400).json({ msg: "Payment verification failed", success: false });
//              return;
//         }

//     } catch (error) {
//         console.error("Payment Verification Error:", error);
//          res.status(500).json({ msg: "Internal server error" });
//          return;
//     }
// };




// export const paymentVerification : RequestHandler = async (req:Request,res:Response)=>{
//     const razorpayApiSecret = process.env.RAZORPAY_API_SECRET || "uv2oh7oirqLSjZOO3tUgbzKt";
//     try {
//         const {razorpay_order_id,razorpay_payment_id,razorpay_signature,orderId} = req.body;

//         const orderRepo = AppDataSource.getRepository(Order);
//         const paymentRepo = AppDataSource.getRepository(Payment);

//         //Find the existing order by orderId
//         const order = await orderRepo.findOne({where:{orderId}});

//         if(!order){
//              res.status(400).json({msg:"Order not found"});
//              return;

//         }

//         //Generate HMAC signature for varification
//         const generatedSignature = crypto.createHmac('sha256', razorpayApiSecret)
//                                  .update(`${razorpay_order_id} | ${razorpay_payment_id}`)
//                                  .digest("hex");

//         if(generatedSignature !== razorpay_signature){
//             order.Status = "failed";
//             await orderRepo.save(order)
//              res.status(400).json({msg:"payment verification failed"});
//              return
//         }

//         //create a new payment record linked to the order
//         const newPayment = paymentRepo.create({
//             order ,
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature
//         })

//         await paymentRepo.save(newPayment);

//         order.Status = "success";
//         await orderRepo.save(order);

//         res.json({msg:"Payment verified successfully", order,newPayment})
//         return
        
//     } catch (error) {
//         console.error("Payment Verification Error:", error);
//         res.status(500).json({ message: "Internal Server Error" });

//     }
// }


//It fetches the public Razorpay API key from environment variables (process.env.RAZORPAY_API_KEY).

export const getKey : RequestHandler = async(req:Request,res:Response)=>{
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
}


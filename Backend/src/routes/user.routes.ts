import { Router } from 'express';
import { forgetPassword, getUsers, handleUserLogin, handleUserSignUp, resetPassword } from '../controllers/user';
import { AddProducts, DeleteProduct, getProducts, UpdateProduct } from '../controllers/Product';
import { addToCart, clearCartByUserId, DeleteCartItemByUserId, fetchCartData, minusOneQuantity, plusOneQuantity } from '../controllers/Cart.Controller';
import { getOrders, OrderNow } from '../controllers/Order';
import { checkout, getKey, paymentVerification2 } from '../controllers/payment';
import { verifyToken } from '../Middleware/authMiddleware';
import {authorizeRoles} from '../Middleware/roleMiddleware';
import { AssignRole, createSuperAdmin } from '../controllers/createSuperAdmin';
import { pagination } from '../controllers/Pagination';
import { filterBasedOnCategory, filterBasedOnPrice, searchProducts } from '../controllers/search';

const router = Router();


//user
router.post('/signup', handleUserSignUp);
router.post('/login', handleUserLogin);
router.post('/forget-password',forgetPassword);
router.post('/reset-password/:token',resetPassword);
router.get('/get-users',getUsers);

//create super admin
router.post('/create-super-admin',createSuperAdmin);
router.put('/assign-role/:userId',verifyToken,authorizeRoles('superadmin'),AssignRole);


//products

router.get('/get-products',verifyToken,getProducts);
router.post('/add-product',verifyToken,authorizeRoles('admin','superadmin'),AddProducts);
router.delete('/delete-product/:productId',verifyToken,authorizeRoles('admin','superadmin'),DeleteProduct);
router.put('/update-product/:productId',UpdateProduct);

//cart

router.post('/add-to-cart',verifyToken,addToCart);
router.get('/get-cart-items/:userId',verifyToken,fetchCartData);
router.delete('/clear-cart/:userId',verifyToken,clearCartByUserId);
router.delete('/delete-cart-item/:userId/:cartId',verifyToken, DeleteCartItemByUserId);
router.post('/plus-one-quantity',verifyToken,plusOneQuantity);
router.post('/minus-one-quantity',verifyToken,minusOneQuantity);

//order
router.get('/order-now/:userId',OrderNow);
router.get('/get-order/:userId',verifyToken,getOrders);

//payment

router.post('/checkout',checkout);
router.post('/paymentVerification',paymentVerification2)
router.get('/getkey',getKey)

//pagination
router.get('/pagination',pagination)

//search
router.get('/search/:key',searchProducts);
router.get('/filter-based-on-category/:category',filterBasedOnCategory);
router.get('/filter-based-on-price/:filterPrice',filterBasedOnPrice)


export default router;

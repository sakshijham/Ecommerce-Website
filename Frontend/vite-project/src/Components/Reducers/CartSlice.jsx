import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[]
    },
    reducers:{

        addToCart : (state,action) =>{
            // console.log('action payload',action.payload);

            let cartArray = action.payload;
            // console.log('cartArray',cartArray);

          
            let existingItem = state.cart.find(item=>item.cartId === action.payload.cartId);
            if(existingItem){
                existingItem.quantity +=action.payload.quantity
            }else{
                state.cart.push(action.payload);
            }
        },
        resetCart : (state)=>{
            state.cart = [];
        },
        removefromCart : (state,action) =>{
            const index = action.payload;

            state.cart.splice(index,1);
        },
        updateTotal : (state)=>{
            state.total = state.cart.reduce((total,item)=>total+item.price*item.quantity,0);
        }

    }
})

export default cartSlice.reducer;
export const {addToCart,removefromCart,updateTotal,resetCart} = cartSlice.actions;

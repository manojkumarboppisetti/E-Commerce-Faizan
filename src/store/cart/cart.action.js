import {CART_ACTION_TYPE} from "./cart.types";
import {createAction} from "../../utils/reducer/reducer.utils";

export const setIsCartOpen=(boolean)=>{
    return createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN,boolean);
};

export const addItemToCart = (productToAdd) => {
   return createAction(CART_ACTION_TYPE.ADD_ITEM_TO_CART,productToAdd);
}

export const updateItemQuantityInCart = (productId, type) =>{
    return createAction(CART_ACTION_TYPE.UPDATE_ITEM_QUANTITY_IN_CART, { productId, type });
}

export const removeItemFromCart = (productId) => {
    return createAction(CART_ACTION_TYPE.REMOVE_ITEM_FROM_CART, productId);
}
export const clearCart=(products)=>{
    return createAction(CART_ACTION_TYPE.CLEAR_CART_ITEMS, products)
}


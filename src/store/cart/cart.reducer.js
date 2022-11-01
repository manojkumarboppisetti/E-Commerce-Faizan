import {CART_ACTION_TYPE} from "./cart.types";


const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    delivery:50
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,

            };
        case CART_ACTION_TYPE.ADD_ITEM_TO_CART:
            const cartItems = state.cartItems;
            const newCartItem = {...payload, quantity: 1};

            return {
                ...state,
                cartItems: [...cartItems, newCartItem]
            };
        case CART_ACTION_TYPE.REMOVE_ITEM_FROM_CART:
            const __cartItem = state.cartItems;
            return {
                ...state,
                cartItems: __cartItem.filter(cartItem => cartItem.id !== payload)
            };
        case CART_ACTION_TYPE.UPDATE_ITEM_QUANTITY_IN_CART :
            const {productId, type} = payload;
            let _cartItems = state.cartItems;

            const productIndex = _cartItems.findIndex((product) => product.id === productId);

            if (productIndex > -1) {
                const updatedItem = _cartItems[productIndex];
                if (type === "increase") {
                    updatedItem['quantity'] += 1;
                    _cartItems[productIndex] = updatedItem;
                    console.log("increase", updatedItem['quantity']);
                } else if (type === 'decrease') {
                    if (updatedItem['quantity'] > 1) {
                        updatedItem['quantity'] -= 1;
                        _cartItems[productIndex] = updatedItem;
                    } else {
                        _cartItems = _cartItems.filter((product)=> product.id !== productId);
                    }
                }
            };
            return {
                ...state,
                cartItems: new Array(..._cartItems)
            };
        case CART_ACTION_TYPE.CLEAR_CART_ITEMS :
            return{
                cartItems: []
            }


        default:
            return state;
    }

}
import './checkout-item.styles.scss';
import {selectCartItems} from "../../store/cart/cart.selector";
import { removeItemFromCart, updateItemQuantityInCart} from "../../store/cart/cart.action";
import {useDispatch, useSelector} from "react-redux";
import {Confirm} from "../Modal/modal.component";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

export const CheckoutItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;

    const cartItems=useSelector(selectCartItems);

    const dispatch=useDispatch();

    const updateItem = (type) => {
        dispatch(updateItemQuantityInCart(cartItem.id, type));
        if(cartItems.length<1){
           dispatch(removeItemFromCart(cartItem.id));
        }
    }


    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>

            <span className='quantity'>
               <Tippy content='Decrease Quantity'>
                   <div className='arrow' onClick={()=>updateItem('decrease')}>&#10094;</div>
                   </Tippy>
                <span className='value'>{quantity}</span>
                <Tippy content='Increase Quantity '>
                <div className='arrow' onClick={()=>updateItem('increase')} >&#10095;</div>
                </Tippy>
            </span>

            <span className='price'>{price}</span>
            <span className='name'>{quantity} x {price}</span>
          <Tippy content={<>Remove this Item , {name}</>} >
              <div className='remove-button' ><Confirm id={cartItem.id}/></div>
          </Tippy>
        </div>
    )
}
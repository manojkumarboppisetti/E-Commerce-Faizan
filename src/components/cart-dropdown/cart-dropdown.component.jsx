import {CartDropdownContainer,EmptyMessage,CartItems} from "./cart-dropdown.styles";
import {selectCartItems, selectIsCartOpen} from "../../store/cart/cart.selector";
import {Button} from "../button/button.component";
import {CartItem} from "../cart-item/cart-item.component";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {setIsCartOpen} from "../../store/cart/cart.action";

export const CartDropdown=()=>
{
    const cartItems=useSelector(selectCartItems);
    const isCartOpen=useSelector(selectIsCartOpen);
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const goToCheckoutHandler=()=>{
        navigate('/checkout');
        dispatch(setIsCartOpen(!isCartOpen));
    };

        return(
            <CartDropdownContainer>
                 <CartItems>
                     {
                          cartItems?.length ? (cartItems.map((item)=>(<CartItem key={item.id} cartItem={item}/>)))
                             :(<EmptyMessage>Your Cart Is Empty</EmptyMessage>)
                     }
                 </CartItems>
                {cartItems.length>0 && <Button  onClick={goToCheckoutHandler} >CHECKOUT</Button>}

        </CartDropdownContainer>

    )
 }

import {ShoppingIcon,ItemCount,CartIconContainer} from "./cart-icon.styles";
import {useDispatch,useSelector} from "react-redux";
import {selectCartCount,selectIsCartOpen} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';


export const CartIcon=()=>{

const dispatch=useDispatch();

const cartCount=useSelector(selectCartCount);

const isCartOpen=useSelector(selectIsCartOpen);


    const toggleIsCartOpen=()=>dispatch(setIsCartOpen(!isCartOpen))

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            {isCartOpen && <Tippy content='close cart'>
                <ShoppingIcon/>
            </Tippy>}
            {!isCartOpen && <Tippy content='open cart'>
                <ShoppingIcon/>
            </Tippy>}

            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

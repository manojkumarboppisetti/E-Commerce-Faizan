import "./checkout.styles.scss";

import {selectCartItems, selectCartTotal} from "../../../store/cart/cart.selector";
import {CheckoutItem} from "../../checkout-item/checkout-item.component";
import {useSelector} from "react-redux";
import {Button} from "../../button/button.component";
import {useNavigate} from "react-router-dom";
import {StatusComponent} from "../../status/status.component";

export const Checkout = () => {

    const navigate = useNavigate();
    const delivery = useSelector(state => state.cart.delivery);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const handleCheckout = () => {
        if (cartItems.length) {
            navigate('/address');
        } else {
            alert('Your cart is Empty');
            navigate('/shop');
        }
    };

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>

                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Item x Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Actions</span>
                </div>

            </div>
            {
                cartItems?.length > 0 && <>
                    {cartItems?.map((cartItem) =>
                        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                    )}
                    <span className='total'>Total:${cartTotal}</span>
                    {cartTotal<=500 &&<> <span className='total'>Delivery Charges : ${delivery}</span>
                        <span className='total'>Gross Total: ${cartTotal+delivery}</span>
                    </>}
                    {cartTotal>500 && <><span className='line'>Delivery Charges :$50</span>
                    <span className='total'>Gross Total: ${cartTotal}</span></>}
                    <Button onClick={handleCheckout}>Proceed To Checkout</Button>
                </>
            }
            {
                cartItems?.length === 0 && <StatusComponent message={"Cart is empty. Please add items to checkout"}>
                </StatusComponent>
            }
        </div>

    )
}
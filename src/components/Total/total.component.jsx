import {useSelector} from "react-redux";
import './total.styles.scss'

export const Total = () => {
    const cart = useSelector(state => state.cart);
    console.log(cart.delivery);


    let sum = 0;
    for (let i = 0; i < cart.cartItems.length; i++) {
        sum += (cart.cartItems[i].price * cart.cartItems[i].quantity);

    };


    return (
        <div className='totals-container'>
            <div className='totals'>
                <h3>Your Total Amount</h3>

                <div className='content'>
                    <div>Total</div>
                    <div>${sum}</div>
                </div>
                <div className='content'>
                    {sum<=500 && <> <div>Delivery</div>
                    <div>$ {cart?.delivery}</div></>
                    }
                    {sum>500 && <> <div className='line'>Delivery</div>
                        <div  className='line'>$ 50</div></>
                    }
                </div>
                <hr/>
                <div className='content'>
                    <div>Gross Total</div>
                    {sum<=500 && <div> ${sum + cart?.delivery}</div>}
                    {sum >500 && <div> ${sum}</div>}
                </div>

            </div>
        </div>
    )
}
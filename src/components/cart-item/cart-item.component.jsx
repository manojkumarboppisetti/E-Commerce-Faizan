import "./cart-item.styles.scss";

export const CartItem = ({cartItem}) => {

    const {name, quantity, imageUrl, price} = cartItem;


    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='item-details'>
                <div className='item-name'>
                    {name}
                </div>
                <div className='item-price'>
                    {quantity} x ${price}
                </div>
            </div>
        </div>
    )
}

import "./product-card.styles.scss";
import {Button} from "../button/button.component"
import {addItemToCart, updateItemQuantityInCart} from "../../store/cart/cart.action";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch, useSelector} from "react-redux";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import {Link} from "react-router-dom";
import {selectCategoriesMap} from "../../store/categories/category.selector";


export const ProductCard = ({product}) => {
    const categoriesMap = useSelector(selectCategoriesMap);

    const {name, price, imageUrl, id} = product;

    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();


    const addItemIntoCart = () => {

        toast.success("Item added to Cart successfully", {
            position: "bottom-right",
            autoClose: 800,
            closeOnClick: true,
            pauseOnHover: false,
            theme: 'colored'
        });
        dispatch(addItemToCart(product));
    };

    const updateItem = (type) => {
        dispatch(updateItemQuantityInCart(product.id, type));
    };


    return (
        <div className="main">

            <div className='product-card-container'>

                <img src={imageUrl} alt={`${name}`}/>

                <div className='footer'>
                    <Link to={`${id}`}> <span className='name'>{name}</span></Link>
                    <span className='price'>${price}</span>
                </div>

                {cartItems?.find((e) => ((e.id === product.id) && e.quantity > 0)) ?
                    (<div className="btn">
                        <Tippy content='Decrease Quantity'>
                            <div className='updateButton' onClick={() => updateItem('decrease')}>
                                -
                            </div>
                        </Tippy>
                        <div>

                            {cartItems.map((e) => {
                                if (e.id === product.id)
                                    return e.quantity;
                            })}

                        </div>
                        <Tippy content='Increase Quantity'>
                            <div className='updateButton' onClick={() => updateItem('increase')}>
                                +
                            </div>
                        </Tippy>
                    </div>)
                    : (
                        <Button onClick={addItemIntoCart}>Add to cart</Button>
                    )
                }
            </div>
            <ToastContainer pauseOnHover={false}/>


        </div>
    )
}

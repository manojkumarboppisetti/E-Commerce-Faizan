import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './single-product.styles.scss'
import {useEffect, useState} from "react";
import {addItemToCart, updateItemQuantityInCart} from "../../store/cart/cart.action";
import {toast, ToastContainer} from "react-toastify";
import {StatusComponent} from "../status/status.component";
import Tippy from "@tippyjs/react";

export const SingleProductDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const cartItems = useSelector((state) => state.cart.cartItems);

    console.log("categories", categories);
    const [product, setProduct] = useState(undefined);


    useEffect(() => {

        const products = [];
        categories?.forEach(category => {
            products.push(...category.items);
        });
        const product = products?.find((product) => product?.id.toString() === id);
        setProduct(product);

        // categories.forEach(category => {
        //     category.items((product) => {
        //         if (product.id.toString() === id) {
        //             setProduct(product);
        //         }
        //     })
        // });


    }, [categories, id]);

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
        <>

            {(product?.id) && <div className="mains-container">

                <div className='images-container'>
                    <img src={product?.imageUrl} alt='productImage'/>
                </div>
                <div className='sub-container'>
                    <div className='name-container'>
                        <span className='Name'>Name:</span>
                        <span className="product-Name">{product?.name}</span>
                    </div>
                    <div className='name-container'>
                        <span className='Name'>Price:</span>
                        <span className="product-Name">${product?.price}</span>
                    </div>
                    <div><span className='description'>Description</span>: Lorem Ipsum is simply dummy text
                        of the printing
                        and typesetting industry. Lorem Ipsum
                        has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen book. It has survived not only five
                        centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
                        was
                        popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                        and
                        more recently with desktop publishing software like Aldus PageMaker including versions of Lorem
                        Ipsum.
                    </div>
                    {
                        cartItems?.find((e) => ((e.id === product.id) && e.quantity > 0)) &&
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
                    }

                    {
                        !cartItems?.find((e) => ((e.id === product.id) && e.quantity > 0)) &&
                        <button className='btn-contain' onClick={addItemIntoCart}>ADD TO CART</button>
                    }

                < /div>

            </div>
            }
            {
                !(product?.id) && <StatusComponent message={"Product Details Not Found"}/>
            }
            <ToastContainer/>

        </>
    )
}
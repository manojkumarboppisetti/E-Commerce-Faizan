import {FormInput} from "../form-input/form-input.component";
import {useState} from "react";
import './address.styles.scss'
import {Button} from "../button/button.component";
import { useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../../store/cart/cart.action";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Total} from "../Total/total.component";

export const Address = () => {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch=useDispatch();

    const defaultInputField = {
        fullName: '',
        email: '',
        streetAddress: '',
        city: '',
        postcode: ''
    };

    const [addressFields, setAddressFields] = useState(defaultInputField);

    const {fullName, email, streetAddress, city, postcode} = addressFields;

    const handleAddressChange = (e) => {
        const {name, value} = e.target;
        setAddressFields({...addressFields, [name]: value});
    };

    const addressSubmit = (e) => {
        e.preventDefault();
        toast.success("Order placed Successfully",{
            position:"bottom-right",
            closeOnClick: false,
            theme: "colored",
        });
        setTimeout(() => {

            dispatch(clearCart(cartItems));
            navigate('/');
        }, 6000);
    }

    return (
        <div className="address-container">
            <div>
                <Total/>
            </div>
           <div className="address-fields">
               <h1 className='addAddress'>Add Your Address</h1>
            <form onSubmit={addressSubmit}>
                <FormInput label='Name' type='text' required onChange={handleAddressChange} name='fullName'
                           value={fullName}/>
                <FormInput label='Email' type='text' required onChange={handleAddressChange} name='email'
                           value={email}/>
                <FormInput label='StreetAddress' type='text' required onChange={handleAddressChange}
                           name='streetAddress' value={streetAddress}/>
                <FormInput label='City' type='text' required onChange={handleAddressChange} name='city' value={city}/>
                <FormInput label='PostCode' type='number' required onChange={handleAddressChange} name='postcode'
                           value={postcode}/>
                <Button className="btnSubmit" type='submit'>Place Your Order</Button>

            </form>
           </div>
   <ToastContainer pauseOnHover={false}/>
        </div>
    )
}


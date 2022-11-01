import {Route, Routes} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Home} from "./components/routes/home/home.component";
import {Navigation} from "./components/routes/navigation/navigation.component";
import {Authentication} from "./components/routes/authentication/authentication.component";
import {Shop} from "./components/routes/shop/shop.component";
import {Address} from "./components/address/address.component"
import {Checkout} from "./components/routes/checkout/checkout.component";
import {useEffect} from "react";
import {checkUserSession} from "./store/user/user.action";
import {UserDetails} from "./components/userDetails/userDetails.component";
import {Spinner} from "./components/spinner/spinner.component";
import {SingleProductDetails} from "./components/single-product--details/single-product-details.component";
import {Help} from "./components/help/help.component";
import {Orders} from "./components/order/order.component";
import {useLocation} from 'react-router-dom';
import {setIsCartOpen} from "./store/cart/cart.action";

const App = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const {isCheckLoginUnderProgress} = useSelector(state => state.user);

    useEffect(() => {
        console.log("route changed", location);
        dispatch(setIsCartOpen(false));
    }, [location]);

    useEffect(() => {
        // const unsubscribe=onAuthStateChangedListener((user)=>{
        //     if(user){
        //         createUserDocumentFromAuth(user);
        //     }
        //     dispatch(setCurrentUser(user));
        // });
        // return unsubscribe;
        dispatch(checkUserSession());
    }, [dispatch]);


    return (
        <>
            {
                isCheckLoginUnderProgress && <Spinner/>
            }
            {
                !isCheckLoginUnderProgress && <Routes>
                    <Route path="/" element={<Navigation/>}>
                        <Route index element={<Home/>}/>
                        <Route path="auth" element={<Authentication/>}/>
                        <Route path="shop/*" element={<Shop/>}></Route>
                        <Route path='shop/:category/:id' element={<SingleProductDetails/>}/>
                        <Route path="checkout" element={<Checkout/>}/>
                        <Route path="address" element={<Address/>}/>
                        <Route path="profile" element={<UserDetails/>}/>
                        <Route path="help" element={<Help/>}/>
                        <Route path="orders" element={<Orders/>}/>
                    </Route>
                </Routes>
            }

        </>
    );
}

export default App;

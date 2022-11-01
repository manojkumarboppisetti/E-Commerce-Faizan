import {Outlet} from "react-router-dom";
import {CartIcon} from "../../cart-icon/cart-icon.component";
import {ReactComponent as Crwn} from '../../../assests/crwn.svg';
import {selectUser} from "../../../store/user/user.selector";
import {signOutUser} from "../../../utils/firebase/firebase.utils";
import {CartDropdown} from "../../cart-dropdown/cart-dropdown.component";
import {selectIsCartOpen} from "../../../store/cart/cart.selector";
import {NavigationContainer, LogoContainer} from "./navigation.styles";
import {useDispatch, useSelector} from "react-redux";
import './navigation.styles.scss'
import {NavLink} from "react-router-dom";
import {useEffect} from "react";


export const Navigation = () => {

    const currentUser = useSelector(selectUser);
    const isCartOpen = useSelector(selectIsCartOpen);


    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <Crwn/>
                </LogoContainer>
                <div className='nav-links'>
                    <NavLink to='/shop'>Shop</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <NavLink to='/help'>Help</NavLink>
                    <NavLink to='/orders'>Orders</NavLink>
                    <CartIcon/>
                    {
                        currentUser && <>
                            <div className='current'>
                                <span className='welcome'>Hello!</span> {currentUser?.displayName || "User"}
                            </div>
                            <NavLink as="span" onClick={signOutUser}>SignOut</NavLink>
                        </>
                    }
                    {
                        !currentUser && <NavLink to='/auth'>SignIn</NavLink>

                    }
                </div>
                {isCartOpen && <CartDropdown/>}
            </NavigationContainer>
            <Outlet/>
        </>
    )
}
import './userDetails.styles.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "../../store/user/user.selector";
import {StatusComponent} from "../status/status.component";
import {Orders} from "../order/order.component";
import {useEffect} from "react";
import {selectIsCartOpen} from "../../store/cart/cart.selector";

export const UserDetails = () => {
    const currentUser = useSelector(selectUser);
    return (
        <>
            {
                currentUser && <div className={'main-container-box'}>
                    <div className={'sub-main-container-box'}>
                        <div className={'profile-box'}>
                            <div className={'pic-box'}>
                                <img className={'pic'}
                                     src={'https://thumbs.dreamstime.com/z/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg'}
                                     alt={'profile-pic'}/>
                            </div>
                            <p>{currentUser.displayName}</p>
                            <p>{currentUser.email} </p>
                        </div>
                    </div>
                    <div className={'orders'}>
                        <Orders/>
                    </div>


                </div>

            }
            {
                !currentUser && <StatusComponent message="No Active User"/>
            }
        </>
    )
}
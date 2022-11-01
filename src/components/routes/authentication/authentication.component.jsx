import {SignUp} from "../../sign-up-form/sign-up-form.component";
import {SignIn} from "../../sign-in-form/sign-in-form.component";
import {useSelector} from "react-redux";
import "./authentication.styles.scss"
import {Spinner} from '../../spinner/spinner.component'
import {checkUserSession} from "../../../store/user/user.action";

export const Authentication = () => {
    const user = useSelector(state => state.user);
    return (
        <div className="authentication-container">

            <SignIn/>
            <SignUp/>

        </div>
    )
}
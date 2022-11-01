import {useState} from "react"
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils"
import {FormInput} from "../form-input/form-input.component"
import "./sign-in-form.styles.scss"
import {useDispatch, useSelector} from "react-redux";
import {checkUserSession, setCurrentUser} from "../../store/user/user.action";
import {useNavigate} from "react-router-dom";
import {Spinner} from '../spinner/spinner.component'


const defaultFormField = {

    email: '',
    password: '',

};

export const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormField);

    const {email, password} = formFields;
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const resetFormField = () => {
        setFormFields(defaultFormField);
    };

    const SignInWithGoogle = async () => {
        await signInWithGooglePopup();
        if (user) {
            dispatch(checkUserSession());
            setTimeout(() => {
                navigate('/');
            }, 3000)
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(user);
            resetFormField();
            if (user) {
                dispatch(checkUserSession());
                setTimeout(() => {
                    navigate('/');
                }, 3000)
            }


        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert("Wrong Password for Email");
                    break

                case 'auth/user-not-found':
                    alert("No email associated with this email");
                    break

                default:
                    console.log(error);
            }
            ;

        }
        ;
        dispatch(setCurrentUser(user));

    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});

    }


    return (
        <>
        <div className="sign-up-container">
            <h2>Already have an account ?</h2>
            <span>Sign-In with your Email and Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password"
                           value={password}/>

                <div className="buttons-container">

                    <button type="submit" className='signIn'>Sign In</button>
                    <button type="button" className='signInGoogle' onClick={SignInWithGoogle}>
                        Google Sign-IN
                    </button>

                </div>


            </form>

        </div>
            </>
    )
}
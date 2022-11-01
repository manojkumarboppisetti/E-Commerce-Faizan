
import { useState ,useContext} from "react"
import { createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils"
import { FormInput } from "../form-input/form-input.component"
import "./sign-up-form.styles.scss"
import { Button } from "../button/button.component"


const defaultFormField={
    displayName:'',
    email:'',
    password:'',
    confirmPassword:''
}

export const SignUp=()=>{

    const [formFields,setFormFields]=useState(defaultFormField);
    const {displayName,email,password,confirmPassword}=formFields;

    const resetFormField=()=>{
        setFormFields(defaultFormField)
    };

    const handleSubmit=async (e)=>{
      e.preventDefault();
      if(password!==confirmPassword){
        alert("Passwords do not match");
        return;
      }
      try {
        const { user } = await createAuthUserWithEmailAndPassword(email, password);

        await createUserDocumentFromAuth(user,{displayName});
        resetFormField();
      } catch(error){
        if(error.code==="auth/email-already-in-use"){
            alert("cannot create user,email already in use");
        } else{
        console.log("user creation encountered an error",error);
        }
      }
    };

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormFields({...formFields,[name]:value})
    };

    return(
        <div className="sign-up-container">
          <h2>Don't have an account ?</h2>
            <span>Sign-Up with your Email and Password</span>
            <form onSubmit={handleSubmit}>
            
            <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
            
            <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
            
            <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
          
            <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
            <Button type="submit">Sign Up</Button>
            </form>
        </div>
    )
}
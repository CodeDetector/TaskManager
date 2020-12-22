import React from 'react'
import './SignIn.styles.css'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/customButton/customButton.component'
import {SignInwithGoogle, auth} from '../../components/firebase/firebase'
// import firestore from 'firebase/firestore'


class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
        }
    }

    handleSubmit=async (event)=>{
        event.preventDefault();
        const {email,password}=this.state;
        try{
            const {userAuth}=await auth.signInWithEmailAndPassword(email,password);
            console.log(userAuth);
            // firestore().collection("users").doc(this.state.currentUserEmail).collection("follows").doc(email).get() .then((docSnapshot) => { var check; if (docSnapshot.exists){ Alert.alert("hi"); return Promise.reject( true ); }else{ Alert.alert("not hi"); return Promise.reject( false ); } return (check.promise) })
        }catch(error){
            console.log(error);
        }
        this.setState({email:'',password:''})
    }

    handleInputChange=(event)=>{
        const {name,value}=event.target;
        this.setState({[name]:value})
    }

    render(){
        return(
            <div className="signIn">
                <h2 className="title">I already have an account</h2>
                <span className="subtitle">Sign-In to your account</span>
                
                <form onSubmit={this.handleSubmit}>
                    <FormInput type="email" name="email" value={this.state.email} required handleChange={this.handleInputChange} label="email"/> 
                    <FormInput type="password" name="password" label="password" value={this.state.password} handleChange={this.handleInputChange}/>
                    <div className="SignInbuttons" style={{display:'flex',justifyContent:'space-between'}}>
                        <CustomButton type="submit" >Sign In</CustomButton>
                        <CustomButton onClick={SignInwithGoogle} isGoogleSignIn={true}>Sign In With Google</CustomButton>
                    </div> 
                </form>
            </div>
        )
    }
}

export default SignIn;
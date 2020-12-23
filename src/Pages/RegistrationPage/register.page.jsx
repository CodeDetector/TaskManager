import React from 'react'
import FormInput from '../../components/form-input/form-input.component'
import CustomButton from '../../components/customButton/customButton.component'
import './register.styles.css'
import {auth} from '../../components/firebase/firebase'
import createUserProfileDocument from '../../components/firebase/firebase'
import { Link, Redirect } from 'react-router-dom'

class Register extends React.Component{
    constructor()
    {
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            confirmpassword:''
        }
    }
    handleSubmit=async(event)=>{
        event.preventDefault();
        const {name,email,password,confirmPassword}=this.state;
        if(password!==confirmPassword)
        {
            alert('Password not matched')
            return;
        }
        if(password.length<6)
        {
            alert('password must be atleast 6 characters long');
            return;
        }
        try {
            const {user}=await auth.createUserWithEmailAndPassword(email,password)
            await createUserProfileDocument(user,{name});
            this.setState=({
                name:'',
                email:'',
                password:'',
                confirmPassword:''
            })
        } catch (error) {
            console.log(error);
            }
    }
    handleChange=event=>{
        const {name,value}=event.target;
        this.setState({[name]:value});
    }
    render()
    {
        const {name,email,password,confirmPassword}=this.state;
        return(
            
            <div className="sign-up">
                <h2 className="title">Create New Account</h2>
                <span>Sign Up</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput 
                    type="text" 
                    name='Name' 
                    value={name} 
                    onChange={this.handleChange}
                    label='Name' 
                    required>
                    </FormInput>
                    <FormInput 
                    type="email" 
                    name='email' 
                    value={email} 
                    onChange={this.handleChange}
                    label='Email' 
                    required>
                    </FormInput>
                    <FormInput 
                    type="password" 
                    name='password' 
                    value={password} 
                    onChange={this.handleChange}
                    label='Password' 
                    required>
                    </FormInput>
                    <FormInput 
                    type="password" 
                    name='confirmPassword' 
                    value={confirmPassword} 
                    onChange={this.handleChange}
                    label='Confirm Password' 
                    required>
                    </FormInput>
                    <Link to="/signin">Already have an account? SignIn</Link>
                    <CustomButton type="submit" >Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}
export default Register;
import React from 'react'
// import Button from '@material-ui/core/Button';
import logo from '../assets/logo.svg'
import './Header.css'
import {withRouter,Link} from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors'
import { connect } from 'react-redux';
import {auth} from '../components/firebase/firebase'
import { clearBoard } from '../redux/cart/cart.actions';
const Header=({currentuser,clearBoard})=>{

    return(
        <div className="header">
            <div className="logo-container">
                <Link to="/">
                <img src={logo} alt="TaskManager" />
                </Link>
            </div>
            <div className="Name">
                Task Manager
            </div>
            <div className="SignIn_SignUp">
            {
                        currentuser?
                      <div className="option" onClick={()=>{auth.signOut();clearBoard()}} style={{cursor:'pointer'}}>Sign Out</div>:
                      <div className="SignIn_SignUp"> 
                      <Link className="option" to='/signin' style={{textDecoration:'none',color:'inherit',cursor:'pointer'}}>Sign In</Link>
                      <Link className="option" to="/register" style={{textDecoration:'none',color:'inherit',cursor:"pointer"}}>Sign Up</Link>
                      </div>
            }
            </div>
        </div>
    )
};
const mapstatetoprops=createStructuredSelector(
    {
        currentuser: selectCurrentUser
    }
)
const mapDispatchtoProps=(dispatch)=>({
    clearBoard:()=>{dispatch(clearBoard())}
})

export default withRouter(connect(mapstatetoprops,mapDispatchtoProps)(Header));
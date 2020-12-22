import React from 'react'
// import Button from '@material-ui/core/Button';
import logo from '../assets/logo.svg'
import './Header.css'
import {useHistory, withRouter,Link} from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {selectCurrentUser} from '../redux/user/user.selectors'
import { connect } from 'react-redux';
import {auth} from '../components/firebase/firebase'
const Header=({currentuser})=>{
    const history = useHistory();
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
                      <div className="option" onClick={()=>auth.signOut()} style={{cursor:'pointer'}}>Sign Out</div>:
                      <Link className="option" to='/signin' style={{textDecoration:'none',color:'inherit',cursor:'pointer'}}>Sign In</Link>
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
export default withRouter(connect(mapstatetoprops)(Header));
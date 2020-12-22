import './App.css';
import React from 'react';
import Header from './components/Header'
import {Route,Redirect,Switch} from 'react-router-dom'
import Home from './Pages/HomePage/HomePage'
import SignIn from './Pages/SignInPage/SignInPage';
import Register from './Pages/RegistrationPage/register.page'
import {auth} from './components/firebase/firebase'
import CreateUserProfileDocument from './components/firebase/firebase'
import {connect} from 'react-redux'
import { setCurrentUser} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

class App extends React.Component {
  
  unsubscribeFromAuth=null;

  componentDidMount(){
    const {setCurrentUser}=this.props;
    // console.log("Mounted");
    this.unsubscribefromAuth=auth.onAuthStateChanged(async userAuth=>{
     if(userAuth)
     { 
      //  console.log(userAuth);
       const userRef=CreateUserProfileDocument(userAuth);
      //  console.log(userAuth)
       (await userRef).onSnapshot(snapshot=>{
          setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
            })
            console.log(snapshot);
        })      
     }
     else
     {
      setCurrentUser(userAuth);
     }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <div className="Header">
          <Header/>
        <Switch>
          <Route exact path="/" component={Home}/>
          {/* <Route exact path="/login"component={Login}/> */}
          <Route exact path="/signIn" component={SignIn}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
        </div>
      </div>
    );
  } 
};

const mapStateToProps=createStructuredSelector({
      currentUser:selectCurrentUser
  });

const mapDispatchToProps=dispatch=>{
  return(
    {
      setCurrentUser:(user)=>dispatch(setCurrentUser(user))
    } 
  )
}
export default connect(mapStateToProps,mapDispatchToProps)(App);

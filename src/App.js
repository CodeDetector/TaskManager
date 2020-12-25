import './App.css';
import React from 'react';
import Header from './components/Header'
import {Route,Redirect,Switch,withRouter} from 'react-router-dom'
import Homepage from './Pages/Home/Home.page'
import Home from './Pages/HomePage/HomePage'
import SignIn from './Pages/SignInPage/SignInPage';
import Register from './Pages/RegistrationPage/register.page'
import {auth} from './components/firebase/firebase'
import CreateUserProfileDocument from './components/firebase/firebase'
import {connect} from 'react-redux'
import { setCurrentUser} from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import Chart from './Pages/Chart/chart.page'

class App extends React.Component {
  
  unsubscribeFromAuth=null;
  user = null;
  componentDidMount(){
    const {setCurrentUser}=this.props;
    // console.log("Mounted");
    this.unsubscribefromAuth=auth.onAuthStateChanged(async userAuth=>{
     if(userAuth)
     { 
       const userRef=CreateUserProfileDocument(userAuth);
       this.user = userRef;
      //  console.log(userAuth)
       (await userRef).onSnapshot(snapshot=>{
          setCurrentUser({
              id:snapshot.id,
              ...snapshot.data()
            })
            console.log("This is the snapshot ",snapshot.data());
        })  
         
     }
     else
     {
      setCurrentUser(userAuth);
     }
    })
  }

  componentWillUnmount(){
    console.log("Unmounted");
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div className="App">
        <div className="Header">
          <Header/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/dashboard" render={()=>this.props.currentUser?<Home/>:<Homepage/>}/>
          {/* <Route exact path="/login"component={Login}/> */}
          <Route exact path="/signIn" render={()=>this.props.currentUser?<Redirect to="/dashboard"/>:<SignIn/>}/>
          <Route exact path="/register"  render={()=>this.props.currentUser?<Redirect to="/dashboard"/>:<Register/>}/>
          <Route exact path="/chart" component={Chart} />
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
      setCurrentUser:(user)=>{dispatch(setCurrentUser(user))},
    } 
  )
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));

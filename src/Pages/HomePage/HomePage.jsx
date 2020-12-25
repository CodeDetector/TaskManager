import React, { useEffect } from 'react'
import Task from '../../components/Task/Task.container'
import NewtaskButton from '../../components/NewtaskButton.component'
import { connect } from 'react-redux'
import Card from '../../components/card/card.component'
import CustomButton from '../../components/customButton/customButton.component'
import { clearBoard } from '../../redux/cart/cart.actions'
import {firestore,auth} from '../../components/firebase/firebase'
import {getTasks} from '../../redux/cart/cart.actions'
import { Button } from '@material-ui/core'
import { withRouter,Redirect,useHistory } from 'react-router-dom'
// import './HomePage.css'
// import Timer from "../../components/Task/Task.container"

const Home=({hidden,clearBoard,getTasks})=>{
    const history = useHistory();
    const handleClick=()=>{
        history.push("/chart");
    }
    
        useEffect(()=>{
            const userRef = firestore.doc(`users/${auth.currentUser.uid}`);
            ( userRef).collection("tasks").get()
       .then(response=>{
          const fetchedtasks=[];
          (response).forEach(task=>
          {
            const fetchedtask={
              id:task.id,
              ...task.data()
            };
            fetchedtasks.push(fetchedtask);
          });
          getTasks(fetchedtasks);
        })   
        },[])
        return(
            <div className="Home" style={{display:"flex",justifyContent:"space-between",flexDirection:"column"}}>
                <div className="firstBlock" style={{display:"flex" ,flexDirection:"row",justifyContent:"space-between",marginTop:"10px",marginLeft:"10px",marginRight:"10px" }}>
                    {/* <h1>This is The HomePage</h1> */}
                    <NewtaskButton/>
                    <CustomButton onClick={()=>clearBoard()}>Clear Board</CustomButton>
                </div>
                <div className="newtask" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                {hidden?null:<Task/>}
                </div>
                <div className="tasks" style={{display:"flex",flexWrap:"wrap",marginBlock:"20px",justifyContent:"normal"}}>
                    <Card/>                    
                </div>
                <div className="chart">
                    <Button color="primary" onClick={handleClick}>Chart</Button>
                </div>
            </div>
        )
}
const mapstatetoprops=(state)=>{ 
    return(
       {hidden:state.cart.hidden
    }
    )
}
const mapDispatchtoProps=(dispatch)=>(
    {
        clearBoard:()=>{dispatch(clearBoard())},
        getTasks:(tasks)=>dispatch(getTasks(tasks))
    }
)
export default withRouter(connect(mapstatetoprops,mapDispatchtoProps)(Home))
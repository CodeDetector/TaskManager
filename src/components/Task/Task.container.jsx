import React from 'react'
import {Grid} from '@material-ui/core'
// import Timer from "../Timer/Timer.component" 
import {connect} from 'react-redux';
import { addtask,hidetask } from '../../redux/cart/cart.actions';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {addtaskstodb} from '../firebase/firebase'

class Task extends React.Component{
constructor(props)
{
    super(props);
    this.state={
        start:0,
        time:0,
        isOn:false,
        iscompleted:false,
        value:null
      }
    this.handleChange = this.handleChange.bind(this);
    this.startTimer=this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.getTime = this.getTime.bind(this);
    this.generateId = this.generateId.bind(this);
}
handleChange(event){
    this.setState({
        value:event.target.value
    });
}
  startTimer=()=>{
    this.setState(state=>({
      ...state,
      start:Math.floor(Date.now()/1000),
      isOn:true
    }))
    
    this.timer = setInterval(() => this.setState(state=>({
            ...state,
            time:Math.floor(Date.now()/1000)- this.state.start
    })), 1000);
}
generateId=()=>{
  return(Math.random().toString(36).substr(2,9))
}
stopTimer=()=>{
  this.setState(state=>({
    ...state,
    isOn:false,
    iscompleted:true
  }))
  clearInterval(this.timer);
  let s = {id:this.generateId(),time:this.state.time,name:this.state.value}
  this.props.addtask(s);
  addtaskstodb(s);
  this.props.hidetask();
}

getTime=()=>{
  let seconds = this.state.time;
  if(seconds<60)
  {
    return seconds+" sec ";
  }
  if(seconds>=60)
  {
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    seconds = seconds%60;
    if(minutes<60)
    {return minutes.toString()+":"+seconds.toString();}
    return hours.toString()+" hrs : "+minutes.toString()+" min : "+seconds.toString()+" sec ";
  }
} 
render()
{
    let timeElapsed = this.getTime();
    let {isOn,iscompleted} = this.state;
    return( 
        <Paper style={{padding:"3px",display:"flex",width:"70%"}} >
        <Grid container direction="row" alignItems="center" style={{display:"flex",justifyContent:"space-evenly"}} >
                <Grid item xs={6}>
                    <TextField label ="Task Name" onChange={this.handleChange} value={this.state.value} required></TextField>
                </Grid>
                <Grid item xs={4} direction="row" style={{display:"flex",justifyContent:"space-around"}}>
                    <TextField value={timeElapsed}/>
                    <Button variant="contained" color="primary" onClick={this.startTimer} disabled={isOn||iscompleted} style={{margin:"5px",padding:"2px"}}> Start </Button>
                    <Button variant="contained" color="secondary" onClick={this.stopTimer} disabled={!isOn||iscompleted} style={{margin:"2px"}} type="submit">Complete</Button>
                </Grid>
        </Grid>
        </Paper>
    )
}
}

const mapDispatchtoProps=(dispatch)=>(
    {
        addtask:(item)=>{dispatch(addtask(item))},
        hidetask:()=>{dispatch(hidetask())}
    }
)
const mapstatetoprops=(state)=>{
  return(
    {
      counter:state.cart.tasks.length
    }
  )
}
export default connect(mapstatetoprops,mapDispatchtoProps)(Task);
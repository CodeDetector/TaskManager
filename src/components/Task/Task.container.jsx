import React from 'react'
import {Grid} from '@material-ui/core'
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
        value:null,
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
getTime=()=>{
  let seconds = this.state.time;
  let time;
  if(seconds<60)
  {
    time = seconds+"sec";
    return time;
  }
  if(seconds>=60)
  {
    let minutes = Math.floor(seconds/60);
    let hours = Math.floor(minutes/60);
    seconds = seconds%60;
    if(minutes<60)
    {
      time = minutes.toString()+":"+seconds.toString()
      return time;
    }
    time = hours.toString()+" hrs : "+minutes.toString()+" min : "+seconds.toString()+" sec "
    return time;
  }
} 
stopTimer=()=>{
  this.setState(state=>({
    ...state,
    isOn:false,
    iscompleted:true
  }))
  clearInterval(this.timer);
  let showTime = this.getTime();
  let s = {id:this.generateId(),time:showTime,name:this.state.value}
  this.props.addtask(s);
  addtaskstodb(s);
  this.props.hidetask();
}

render()
{
    let timeElapsed = this.getTime();
    let {isOn,iscompleted} = this.state;
  
    return( 
        <Paper style={{padding:"3px",display:"flex",width:"70%"}} >
        <Grid container direction="row" alignItems="center" style={{display:"flex",justifyContent:"space-around",alignItems:"center"}} >
                <Grid item xs>
                    <TextField placeholder="Task Name" onChange={this.handleChange} value={this.state.value} required></TextField>
                </Grid>
                <Grid item xs direction="row" style={{display:"flex",justifyContent:"space-evenly",alignContent:"space-evenly"}}>
                  <span >
                  <TextField value={timeElapsed} />
                  </span>
                   <span style={{display:'flex',flexDirection:"row",justifyContent:"space-around"}}>
                    <Button variant="contained" color="primary" onClick={this.startTimer} disabled={isOn||iscompleted} style={{margin:"5px",padding:"2px"}}> Start </Button>
                    <Button variant="contained" color="secondary" onClick={this.stopTimer} disabled={!isOn||iscompleted} style={{margin:"2px"}} type="submit">Complete</Button>
                    </span>
                </Grid>
        </Grid>
        </Paper>
    )
}
}
// const Task=({addtask,hidetask})=>{
//   const [start,setStart] = useState(0);
//   const [time,setTime] = useState(0);
//   const [isOn,setOn] = useState(false);
//   const [iscompleted,setComplete] = useState(false);
//   const [value,setValue] = useState("");

//   let timer;
// const handleChange =(event)=>{
//     setValue({value:event.target.value});
// }
// const startTimer=()=>{
//     setStart({start:Math.floor(Date.now()/1000)})
//     setOn({isOn:true});
//     timer = setInterval(()=>setTime({time:Math.floor(Date.now()/1000)- start}),1000);
// }
// const generateId=()=>{
//   return(Math.random().toString(36).substr(2,9))
// }
// const stopTimer=()=>{
//   setOn({isOn:false});
//   setComplete({iscompleted:true})
//   clearInterval(timer);
//   let s = {id:generateId(),time:time,name:value}
//   addtask(s);
//   addtaskstodb(s);
//   hidetask();
// }

// const getTime=()=>{
//   let seconds = time;
//   if(seconds<60)
//   {
//     return seconds+" sec ";
//   }
//   if(seconds>=60)
//   {
//     let minutes = Math.floor(seconds/60);
//     let hours = Math.floor(minutes/60);
//     seconds = seconds%60;
//     if(minutes<60)
//     {return minutes.toString()+":"+seconds.toString();}
//     return hours.toString()+" hrs : "+minutes.toString()+" min : "+seconds.toString()+" sec ";
//   }
// } 
// return(
//       <Paper style={{padding:"3px",display:"flex",width:"70%"}} >
//       <Grid container direction="row" alignItems="center" style={{display:"flex",justifyContent:"space-evenly"}} >
//               <Grid item xs={6}>
//                   <TextField label ="Task Name" onChange={handleChange} value={value} required></TextField>
//               </Grid>
//               <Grid item xs={4} direction="row" style={{display:"flex",justifyContent:"space-around"}}>
//                   <TextField value={getTime}/>
//                   <Button variant="contained" color="primary" onClick={startTimer} disabled={isOn||iscompleted} style={{margin:"5px",padding:"2px"}}> Start </Button>
//                   <Button variant="contained" color="secondary" onClick={stopTimer} disabled={!isOn||iscompleted} style={{margin:"2px"}} type="submit">Complete</Button>
//               </Grid>
//       </Grid>
//       </Paper>
// )

// }
const mapDispatchtoProps=(dispatch)=>(
    {
        addtask:(item)=>{dispatch(addtask(item))},
        hidetask:()=>{dispatch(hidetask())}
    }
)

// connect(null,mapDispatchtoProps)(ask);
export default connect(null,mapDispatchtoProps)(Task);
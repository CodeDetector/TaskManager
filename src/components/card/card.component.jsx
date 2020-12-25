import { Button, Paper } from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'
import {removetask} from '../../redux/cart/cart.actions'
import { makeStyles } from '@material-ui/core/styles';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';
  
const useStyles = makeStyles({
    table: {
    minWidth: 650,
    },
});

    const Card=({tasks,removetask})=> {
      const classes = useStyles();
    
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Task name</TableCell>
                <TableCell align="right">Time Spent</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(tasks.length!==0)?
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{tasks.indexOf(task)+1}</TableCell>
                  <TableCell component="th" scope="row">{task.name}</TableCell>
                  <TableCell align="right" style={{fontSize:"20px",fontWeight:"bold"}}>{task.time}</TableCell>
                  {/* {console.log("Task is : ",task)} */}
                  <TableCell align="right">{<Button color="secondary" onClick={()=>removetask(task.id)}>Delete</Button>}</TableCell>
                </TableRow>
              )):<p>No tasks added </p>}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }

const mapDispatchtoProps=(dispatch)=>(
    {
        removetask:item=>{dispatch(removetask(item))}
    }
)
const mapstatetoprops=(state)=>{
    return(
        {
            tasks:state.cart.tasks
        }
    )
}
export default connect(mapstatetoprops,mapDispatchtoProps)(Card)
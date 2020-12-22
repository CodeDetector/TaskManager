import { Button, Paper } from '@material-ui/core'
import React from 'react'
import {connect} from 'react-redux'
import {removetask} from '../../redux/cart/cart.actions'

const Card =({name,time,id,removetask})=>{
        return(
            <Paper elevation={3} style={{display:"flex",justifyContent:"space-around",width:"70%"}} >
                <div>{name}</div>
                <div>{time}</div>
                {/* {console.log(this.props)} */}
                <Button variant="contained" color="secondary" onClick={()=>removetask(id)}>Delete</Button>
            </Paper>
        )
}
const mapDispatchtoProps=(dispatch)=>(
    {
        removetask:item=>{dispatch(removetask(item))}
    }
)
export default connect(null,mapDispatchtoProps)(Card)
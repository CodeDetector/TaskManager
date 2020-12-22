import React from 'react';
import { connect } from 'react-redux';
import { createtask } from '../redux/cart/cart.actions';
import CustomButton from './customButton/customButton.component'
// import Task from './Task/Task.container'

class NewtaskButton extends React.Component{
    constructor()
    {
        super();
        this.state={
            counter:0,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick=()=>{
        this.setState(prevstate=>(
                {
                    counter:prevstate.counter+1
                }
            ))
    }

    render()
    {
        return(
            <div className="">
            <CustomButton onClick={()=>this.props.createtask()} invert>New Task</CustomButton>
            </div>
        )
    }
}

const mapDispatchtoProps=(dispatch,ownProps)=>(
{
    createtask:()=>{dispatch(createtask())}
}
)

export default connect(null,mapDispatchtoProps)(NewtaskButton); 

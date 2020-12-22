import React from 'react'
import Task from '../../components/Task/Task.container'
import NewtaskButton from '../../components/NewtaskButton.component'
import { connect } from 'react-redux'
import Card from '../../components/card/card.component'
import CustomButton from '../../components/customButton/customButton.component'
import { clearBoard } from '../../redux/cart/cart.actions'
// import Timer from "../../components/Task/Task.container"

const Home=({hidden,tasks,clearBoard,dispatch})=>{
        return(
            <div className="Home">
                <div className="firstBlock">
                    {/* <h1>This is The HomePage</h1> */}
                    <NewtaskButton/>
                    <CustomButton onClick={()=>clearBoard()}>Clear Board</CustomButton>
                </div>
                {hidden?null:<Task/>}
                <div className="tasks">
                    {tasks.map(task=>
                        <Card id={task.id} time={task.time} name={task.name}/>
                    )}
                </div>
            </div>
        )
}
const mapstatetoprops=(state)=>{
    return(
       {hidden:state.cart.hidden,
       tasks:state.cart.tasks}
    )
}
const mapDispatchtoProps=(dispatch)=>(
    {
        clearBoard:()=>{dispatch(clearBoard())}
    }
)
export default connect(mapstatetoprops,mapDispatchtoProps)(Home)
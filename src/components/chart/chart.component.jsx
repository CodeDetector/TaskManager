import React from 'react'
import {useSelector } from 'react-redux'
import {Doughnut} from 'react-chartjs-2'

const Chartcomponent = ()=>{
    const tasks = useSelector(state => state.cart.tasks)
    if(tasks.length)
    {const labels = tasks.map(task=>task.name);
    var totaltime=0;
    const time = tasks.map(task=>task.seconds);
    for(var i =0 ;i<time.length;i++)
    {
        totaltime+=time[i];
    }
    const color=[]
    for(var i=0;i<time.length;i++ )
    {
        color.push("#"+((1<<24)*Math.random()|0).toString(16));
    }
    console.log(color);
    const portions = time.map(t=>Math.round((t/totaltime)*100));
    return(
    <Doughnut
        data={
            {labels:labels,
            datasets:[{
                data:portions,
                backgroundColor:color,
                borderColor: color,
                  borderWidth: [2, 2, 2, 2, 2,2]
          
            }]}
        }
        options={
            {responsive: true,
            title: {
                display: true,
                position: "top",
                text: "Doughnut Chart",
                fontSize: 18,
                fontColor: "#111"
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                fontColor: "#333",
                fontSize: 16
                }
            }}
        }/>
    )}

}

export default Chartcomponent;
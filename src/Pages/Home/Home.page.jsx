import React from 'react'
import './Home.page.styles.scss'
import Background from '../../assets/1384.jpg'

const Homepage=()=>{
    // const imgMyimageexample = require('https://www.freepik.com/free-vector/wavy-lines-making-circle_6538799.htm#page=2&query=noise&position=21');
    const divStyle = {
    width:'100vw',
    height: '100vh',
    backgroundImage: `url(${Background})`,
    backgroundSize: 'cover',
    overflow_y:'hidden'
    };
    return(
        <div className="Home" style={divStyle}>
             {/* <h1 align="center">Some header example</h1> */}
        </div>
    )
}

export default Homepage;
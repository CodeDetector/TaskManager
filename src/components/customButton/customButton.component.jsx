import React from 'react'
import './custom-button.styles.scss'


const CustomButton=({children,isGoogleSignIn,invert,...otherprops})=>{
return(
    <button className={`${invert?'invert':''} ${isGoogleSignIn?'google-sign-in':''} custom-button`} {...otherprops}>
            {children}
    </button>
)
}

export default CustomButton;
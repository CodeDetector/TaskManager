import React from 'react'
import './form-input.styles.scss'

const FormInput=({handleChange,label,value,...otherFormComponents})=>{
    return(
        <div className="group">
            <input className='form-input' onChange={handleChange}{...otherFormComponents} />
            { 
                label?(
                    <label className="form-input-label">
                      {value?null:label}
                    </label>
                ):null}
        </div>
    )
}

export default FormInput
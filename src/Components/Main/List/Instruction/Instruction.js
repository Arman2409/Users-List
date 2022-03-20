import React from "react";
import './Instruction.css';

function Instruction({instruction}) {
    return(
        <div className="instruction-div">
           <h5 className="instruction-title">
               {instruction}
           </h5>
        </div>
    )
}

export default Instruction
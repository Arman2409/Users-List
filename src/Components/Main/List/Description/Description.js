import React from 'react';
import './Description.css';

function Description() {
    return(
        <div className="column-descr-div">
          <div className="data-type-div" id="order-type-div">
             <p className="type-p">
                order
             </p>
          </div>
          <div className="data-type-div" id="surname-type-div">
            <p className="type-p">
               surname
            </p>
          </div>
          <div className="data-type-div" id="name-type-div">
            <p className="type-p">
               name
            </p>
          </div>
          <div className="data-type-div" id="age-type-div">
            <p className="type-p">
               age
            </p>
           </div>
        </div>
    )
}

export default Description
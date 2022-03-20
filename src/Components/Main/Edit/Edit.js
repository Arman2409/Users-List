import React from "react";
import './Edit.css';

function Edit() {
    return(
        <div className="edit-div">
            <div className="edit-form-div">
                This is the editting component!
                <h2 className="edit-title">
          Edit a member
        </h2>
        {/* member editing inputs  */}
        <input type="text" className="edit-input" id="edit-name-input" placeholder="New name" ></input>
          <label  className="edit-label" forhtml="edit-name-input"></label>
        <input type="text" className="edit-input" id="edit-surname-input" placeholder="New surname"  ></input>
          <label className="edit-label" forhtml="edit-surname-input"></label>
        <input type="number" className="edit-input" id="edit-age-input" placeholder="New age"  ></input>
          <label className="edit-label" forhtml="edit-age-input"></label>
         <p className="submit-text">{}</p>

         {/* dispatching the edited member  */}

        <button className= "edit-submit-button">
          Edit
        </button> 

        {/* closing button  */}
        <button className="edit-close-button">
          <i className="fas fa-times"></i>
        </button>
            </div>
        </div>
    )
} 

export default Edit
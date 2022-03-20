import React from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import './Member.css';

function Member({id, name, surname, age}){
    
  const dispatch = useDispatch()
    
  // dispatching delete member to the store 
  function deleteMember(){
    dispatch({
      type:'delete',
      payload: id,
    })
  }
    
    // dispatching show member to the store 
  function showMember(){
    dispatch({
      type:'show',
      payload:id,
    })
  }
    
  return(
     <div className="member-div">
       <div className="number-div">
         <h4>
           {id}
        </h4>
       </div>
       <div className="data-div">
         <h4>
           {surname}
         </h4>
       </div>
       <div className="data-div">
         <h4>
           {name}
         </h4>
       </div>
       <div className="data-div">
         <h4>
           {age}
         </h4>
       </div>
       {/* member show,edit,delete buttons */}
       <div className="buttons-div">
         <button className="change-button" type="button" id="show-button" onClick={() => showMember()}>
           Show
         </button>
         <button className="change-button" type="button" id="edit-button" >
            <Link to={`/edit`} className="link-edit">
              Edit
            </Link>
          </button>
          <button className="change-button" type="button" id="delete-button"  onClick={() => deleteMember()}>
            Delete
          </button>
        </div>
      </div>
      
    )
}

export default Member
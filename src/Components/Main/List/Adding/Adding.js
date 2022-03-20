import React from 'react';
import { useDispatch} from 'react-redux';
import './Adding.css';
import Form  from './Form/Form';

function Adding(){
    
  const dispatch = useDispatch()

  return(
    <div className="adding-div" >
      <h3>Viewing the members' list</h3>
        {/* opening form for adding a member  */}
          <button className="add-button" onClick={()=>{
            dispatch({
              type:"toggleForm",
              payload:"opened",
            })
           }}>
             Add
          </button>
          <Form />
    </div>
    )
}

export default Adding
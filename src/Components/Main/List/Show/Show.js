import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Show.css';

function Show(){
    
  const [show,setShow] = useState({name:'',surname:'',age:'',showStatus:false})
  const [showCurrent,setShowCurrent] = useState(false)
  const showDiv = useRef()

  //  store variables 
  const dispatch = useDispatch()

  //  getting show member from the store 
  const showMember = useSelector(function(state){
    return state.show
  })

  const showStatus = useSelector(function(state){
    return state.showStatus
  })
    
  useEffect(() => {
    setShow(showMember)
    setShowCurrent(showStatus)
  }, [showMember ,showStatus])
    
  // toggling show window 
  useEffect(() => {
  
    if(showCurrent === true){
      showDiv.current.style = "opacity:1; z-index:3;"
    }
    if(showCurrent === false){
      showDiv.current.style = "opacity:0; z-index:-1;"
    }
  })
    

  return(
    <div className="show-div">
      <div className="show-data-div" ref={showDiv}> 
               
        {/* order div  */}
        <div className="property-div">
          <p className="property-p">
            Order:
          </p>
          <p className="value-p">
            {show.index + 1}
          </p>
        </div>

        {/* name div  */}
        <div className="property-div">
          <p className="property-p">
             Name:
          </p>
          <p className="value-p">
            {show.name}
          </p>
        </div>

        {/* surname div  */}
        <div className="property-div">
          <p className="property-p">
            Surname:
          </p>
          <p className="value-p">
            {show.surname}
          </p>
        </div>

        {/* age div  */}
        <div className="property-div">
          <p className="property-p">
            Age: 
          </p>
          <p className="value-p">
            {show.age}
          </p>
        </div>

        {/* closing button  */}
        <div className="close-show-div" onClick={() => {
          dispatch({
            type:'close show'
          })
        }}>
          <i className="fas fa-times close-icon"></i>
        </div>
      </div>
    </div>
    )
}

export default Show
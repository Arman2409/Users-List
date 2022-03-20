import React, { useEffect, useRef, useState } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import './Form.css';

function Form() {

    // states 
  const [name,setName] = useState('')
  const [surname,setSurname] = useState('')
  const [age,setAge] = useState("")
  const [opacity,setOpacity] = useState()
  const [nameLab,setNameLab] = useState("")
  const [surnameLab,setSurnameLab] = useState("")
  const [ageLab, setAgeLab] = useState("")
  const [zInd,setZInd] = useState(-1)
  const [nameStatus, setNameStatus] = useState(false)
  const [surnameStatus, setSurnameStatus] = useState(false)
  const [ageStatus, setAgeStatus] = useState(false)
  const ageRef = useRef("")
  const newName = useRef("")
  const newSurname = useRef("")

  const dispatch = useDispatch();
    
  // getting formm's status from the store 
  const status = useSelector(function(state){
    return state.formStatus
  })
    
  //  inputs' values onchnage functions 
  function changeName(event){
    setName(event.target.value)
  }
    
  function changeSurname(event){
    setSurname(event.target.value)
  }

  function changeAge(event){
    setAge(event.target.value)
  }
  
  // validating functions 
  function validateName() {
    if(name.length < 2){
        setNameLab('The name must be at least 2 letters and mostly 12 letters.')
        setNameStatus(false)
      }
      else if(name.length > 12){
        setNameLab('The name must be at least 2 letters and mostly 12 letters.')
        setNameStatus(false)
      }
      else if(/[^a-zA-Z]/.test(name)){
        setNameLab("The name should be only letters>")
        setNameStatus(false)
      }
      else{
          setNameLab('')
          setNameStatus(true)
      }
  }

  function validateSurname(){
    if(surname.length < 2){
        setSurnameLab('The surname must be at least 2 letters and mostly 12 letters.')
        setSurnameStatus(false)
      }
      else if(surname.length > 16){
        setSurnameLab('The surname must be at least 2 letters and mostly 16 letters.')
        setSurnameStatus(false)
      }
      else if (/[^a-zA-Z]/.test(surname)){
        setSurnameLab("The surname should be only letters.")
        setSurnameStatus(false)
      }
      else{
          setSurnameLab("")
          setSurnameStatus(true)
      }
  }

  function validateAge(){
    if(age === undefined){
        setAgeLab('Please type the age.')
        setAgeStatus(false)
      }
      else if(age <= 0){
        setAgeLab('Please type the age.')
        setAgeStatus(false)
      }
      else if(isNaN(age)){
        setAgeLab('The age must be only numbers.')
        setAgeStatus(false)
      }
      else if(age >= 1000){
        setAgeLab('The age should not be bigger than 1000.')
        setAgeStatus(false)
      }
      else{
          setAgeLab("")
          setAgeStatus(true)
      }
  }
   
  // functions for capitalizing and lowercasing 
  function lowerCase(e){
   return e.toLowerCase()
  }

  function capitalize(s){
   return s[0].toUpperCase() + s.slice(1);
  }
 
     
  // toggling the form 
  useEffect(()=>{
    if(status === "opened"){
      setOpacity(1)
      setZInd(2)
    }
    else if(status === "closed"){
      setOpacity(0)
      setZInd(-1)
      setName("")
      setSurname("")
      setAge("")
      setNameLab("")
      setSurnameLab("")
      setAgeLab("")
    }
  }, [status])
    
  return(
    <div className="form-div" style={{opacity:opacity, zIndex:zInd}}>
      <h2 className="add-title">Add a member</h2>
         {/* member adding inputs  */}
           <input type="text" className="add-input" id="add-input-name" placeholder="Add name" value={name} onBlur={validateName} onChange={changeName} ></input>
             <label  className="label" forhtml="add-input-name">{nameLab}</label>
            <input type="text" className="add-input"  id="add-input-surname" placeholder="Add surname" value={surname} onBlur={validateSurname} onChange={changeSurname} ></input>
              <label className="label" forhtml="add-input-surname">{surnameLab}</label>
            <input type="number" className="add-input" id="add-input-number" placeholder="Add age" value={age} onBlur={validateAge} onChange={changeAge} ></input>
              <label className="label" forhtml="add-input-number">{ageLab}</label>
             
          
            <button className="submit-button"  onClick={() => {
                validateAge()
                validateName()
                validateSurname()
                // dispatching to the store the new member
               if(nameStatus === true && surnameStatus === true && ageStatus === true){
                ageRef.current = parseInt(age)
                newName.current =   lowerCase(name)
                newName.current = capitalize(newName.current)
                newSurname.current = lowerCase(surname)
                newSurname.current = capitalize(newSurname.current)
                  dispatch({
                    type:"submit", 
                    payload:{
                      user:{ 
                        name:newName.current,
                        surname:newSurname.current,
                        age:ageRef.current,
                      },
                      formStatus:"closed",
                      new:true,
                    }
                   })
                   setNameStatus(false)
                   setSurnameStatus(false)
                   setAgeStatus(false)
                }

            }}>Submit</button> 
            <button className="close-button" onClick={()=>{
                // closing the form 
              dispatch({
                type:"toggleForm",
                payload:'closed',
              })
              
            }}>
              <i className="fas fa-times close"></i>
            </button>
        </div>
    )
}

export default Form
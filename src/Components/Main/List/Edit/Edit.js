import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Edit.css';

function Edit(){
   
    // states 
  const [name,setName] = useState('')
  const [nameLabel,setNameLabel] = useState()
  const [surname,setSurname] = useState('')
  const [surnameLabel,setSurnameLabel] = useState()
  const [ageLabel, setAgeLabel] = useState()
  const [age,setAge] = useState('')
  const [condition,setCondition] = useState(false)
  const [editingMember,setEditingMember] = useState({})
  const [nameValid,setNameValid] = useState(true)
  const [surnameValid,setSurnameValid] = useState(true)
  const [ageValid,setAgeValid] = useState(true)  
  const ageRef = useRef()
  const capName = useRef()
  const capSurname = useRef()

  const editDiv = useRef()

  const dispatch = useDispatch()
  
  // selectors  
  const currentMember = useSelector(function(state){
        return state.currentEdit
  })    

  const editStatus = useSelector(function(state){
      return state.editStatus
  })
    
  // onChange functions for inputs 
  function newName(event){
    setName(event.target.value)
  }

  function newSurname(event){
    setSurname(event.target.value)
  }

  function newAge(event){
    setAge(event.target.value)
  }

  // validating the values 

  function validateName() {
    if(name.length < 2){
        setNameLabel('The name must be at least 2 letters and mostly 12 letters.')
        setNameValid(false)
      }
      else if(name.length > 12){
        setNameLabel('The name must be at least 2 letters and mostly 12 letters.')
        setNameValid(false)
      }
      else if(/[^a-zA-Z]/.test(name)){
        setNameLabel("The name should be only letters.")
        setNameValid(false)
      }
      else{
          setNameLabel("")
          setNameValid(true)
      }
  }

  function validateSurname(){
    if(surname.length < 2){
        setSurnameLabel('The surname must be at least 2 letters and mostly 12 letters.')
        setSurnameValid(false)
      }
      else if(surname.length > 16){
        setSurnameLabel('The surname must be at least 2 letters and mostly 16 letters.')
        setSurnameValid(false)
      }
      else if (/[^a-zA-Z]/.test(surname)){
        setSurnameLabel("The surname should be only letters.")
        setSurnameValid(false)
      }
      else{
          setSurnameValid(true)
          setSurnameLabel("")
      }
  }

  function validateAge(){
    if(age === undefined){
      setAgeLabel('Please type the age.')
      setAgeValid(false)
    }
    else if(age <= 0){
     setAgeLabel('Please type the age.')
     setAgeValid(false)
    }
    else if(isNaN(age)){
      setAgeLabel('The age must be only numbers.')
      setAgeValid(false)
    }
    else if(age >= 1000){
     setAgeLabel('The age should not be bigger than 1000.')
     setAgeValid(false)
    }
    else{
      setAgeValid(true)
      setAgeLabel("")
    }
  }

  function lowerCase(e){
    return e.toLowerCase()
   }
 
  function capitalize(s){
    return s[0].toUpperCase() + s.slice(1);
  }
  
  // getting the being edited member from the store 
  useEffect(() => {
    setEditingMember(currentMember)
    setCondition(editStatus)
    setName(editingMember.name)
    setSurname(editingMember.surname)
    setAge(editingMember.age)
  }, [currentMember , editStatus, condition ,editingMember])
    
  // toggling the edit form 
  useEffect(() => {
    if(condition === true){
      editDiv.current.style = "width:900px; opacity:1; z-index:3;"
    }
    if(condition === false){
      editDiv.current.style = "width:0px; opacity:0; z-index:-1;"
      setNameLabel("")
      setSurnameLabel("")
      setAgeLabel("")
    }
  }, [condition])

  return(
    <div className="edit-div">
      <div className="edit-form-div" ref={editDiv}>
        <h2 className="edit-title">
          Edit a member
        </h2>
        {/* member editing inputs  */}
        <input type="text" className="edit-input" id="edit-name-input" placeholder="New name" value={name} onBlur={validateName} onChange={newName} ></input>
          <label  className="edit-label" forhtml="edit-name-input">{nameLabel}</label>
        <input type="text" className="edit-input" id="edit-surname-input" placeholder="New surname" value={surname} onBlur={validateSurname} onChange={newSurname} ></input>
          <label className="edit-label" forhtml="edit-surname-input">{surnameLabel}</label>
        <input type="number" className="edit-input" id="edit-age-input" placeholder="New age" value={age} onBlur={validateAge} onChange={newAge} ></input>
          <label className="edit-label" forhtml="edit-age-input">{ageLabel}</label>
         <p className="submit-text">{}</p>

         {/* dispatching the edited member  */}

        <button className= "edit-submit-button" onClick={() => {
          validateName()
          validateSurname()
          validateAge()

          if(nameValid === true && surnameValid === true && ageValid === true){
            capName.current =   lowerCase(name)
            capName.current = capitalize(capName.current)
            capSurname.current =   lowerCase(surname)
            capSurname.current = capitalize(capSurname.current)
            ageRef.current = parseInt(age)
            dispatch({
              type:"new edit", 
              payload:{
                id:editingMember.id,
                user:{ 
                  name:capName.current,
                  surname:capSurname.current,
                  age:age,
                },
              }
            })
          }
        }}>
          Edit
        </button> 

        {/* closing button  */}
        <button className="edit-close-button" onClick={() => {
          dispatch({
            type:"close edit",
          })
        }}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
    )
}

export default Edit
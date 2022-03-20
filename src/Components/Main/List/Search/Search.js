import React from "react";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useKeypress from 'react-use-keypress';
import './Search.css';

function Search() {

 // states 
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [age,setAge] = useState("")
    const [nameIsValid,setNameIsValid] = useState(false)
    const [surnameIsValid, setSurnameIsValid] = useState(false)
    const [ageIsValid,setAgeIsValid] = useState(false)
    const [nameLabel,setNameLabel] = useState("")
    const [surnameLabel,setSurnameLabel] = useState("")
    const [ageLabel,setAgeLabel] = useState("")
    const [searchResult,setSearchResult] = useState([])
    const [submitText,setSubmitText] = useState("")

 //  refs 
    const capName = useRef()
    const capSurname = useRef()
    const ageRef = useRef()
    const users = useRef()

  //  dispatch 
    const dispatch = useDispatch()

  //  selectors
    
    const getUsers = useSelector(function(state){
      return state.users
    })

    const getResults = useSelector(function(state){
      return state.searchResults
    })

    // state changing onChange functions 
    function newName(event) {
      setName(event.target.value)
    }

    function newSurname(event){
      setSurname(event.target.value)
    }
    
    function newAge(event){
      setAge(event.target.value)
    }
    
    function lowerCase(e){
       return e.toLowerCase()
   }
             
    function capitalize(s){
       return s[0].toUpperCase() + s.slice(1);
    }
    
    // validating functions 
    function validateName() {
        if(name.length === 0){
          setNameLabel("")
          setNameIsValid(false)
        }
        else if(name.length < 2){
           setNameLabel('The name must be at least 2 letters and mostly 12 letters.')
           setNameIsValid(false)
        }
        else if(name.length > 12){
          setNameLabel('The name must be at least 2 letters and mostly 12 letters.')
          setNameIsValid(false)
        }
        else if(/[^a-zA-Z]/.test(name)){
          setNameLabel("The name should be only letters.")
          setNameIsValid(false)
        }
        else{
          setNameLabel("")
          setNameIsValid(true)
          capName.current = lowerCase(name)
          capName.current = capitalize(capName.current)
        }
   }
    
        
    function validateSurname() {
      if(surname.length === 0){
        setSurnameLabel("")
        setSurnameIsValid(false)
      }
      else if(surname.length < 2){
        setSurnameLabel('The surname must be at least 2 letters and mostly 12 letters.')
        setSurnameIsValid(false)
      }
      else if(surname.length > 16){
        setSurnameLabel('The surname must be at least 2 letters and mostly 16 letters.')
        setSurnameIsValid(false)
      }
      else if (/[^a-zA-Z]/.test(surname)){
       setSurnameLabel("The surname should be only letters.")
       setSurnameIsValid(false)
      }
      else{
        setSurnameLabel("")
        setSurnameIsValid(true)
        capSurname.current = lowerCase(surname)
        capSurname.current = capitalize(capSurname.current)
      }
   }
        
    function validateAge() {
        if(age.length === 0){
           setAgeLabel('')
           setAgeIsValid(false)
        }
        else if(age <= 0){
           setAgeLabel('Please type the age.')
           setAgeIsValid(false)
        }
        else if(isNaN(age)){
           setAgeLabel('The age must be only numbers>')
           setAgeIsValid(false)
        }
        else if(age > 1000){
           setAgeLabel('The age should not be bigger than 1000.')
           setAgeIsValid(false)
        }
       else{
            setAgeLabel("")
            setAgeIsValid(true)
            ageRef.current = parseInt(age);
        }
    }


    //  searching button function 
    function submitSearch() {
        validateName()
        validateSurname()
        validateAge()
        
        if(!nameIsValid && name.length !== 0){
           return;
        }
        if(!surnameIsValid && surname.length !== 0){
          return;
        }
        if(!ageIsValid && age.length !== 0){
          return;
        }
        else{
          setSubmitText("")
          const members = users.current.filter(user => {
            if(nameIsValid && user.name.includes(capName.current)){
               return true;
             }
            if(surnameIsValid && user.surname.includes(capSurname.current)){
               return true;
             }
            if(ageIsValid && user.age === ageRef.current){
               return true;
             }
            //  return true
          })
          dispatch({
            type:'search results',
            payload:members,
          })
        }        
    }
    
    useKeypress('Enter' ,()=>{
      submitSearch()
    })

    // getting updates from the store and changing the states 
    useEffect(() => {
        setSearchResult(getResults)
    }, [getResults, searchResult])

    useEffect(() => {
        users.current = getUsers
   }, [getUsers])
            
    return(
        <div className="search-div">
           <div className="search-inputs-div">
             <div className="search-input-div">
                 <input className="search-input" type="text" id="search-name-input" placeholder="Search by name" value={name} onChange={newName} onBlur={validateName}>   
                 </input>
                 <label className="search-label" htmlFor="search-name-input">
                   {nameLabel}
                 </label>
              </div>
              <div className="search-input-div">
                 <input className="search-input" type="text" id="search-surname-input" placeholder="Search by surname" value={surname} onChange={newSurname} onBlur={validateSurname} >
                 </input>
                 <label className="search-label" htmlFor="search-surname-input">
                   {surnameLabel}
                 </label>
              </div>
              <div className="search-input-div" id="search-age-input-div">
                 <input className="search-input" type="number" id="search-age-input" placeholder="Search by age" value={age} onChange={newAge} onBlur={validateAge} >
                 </input>
                 <label className="search-label" htmlFor="search-age-input">
                   {ageLabel}
                 </label>
              </div>
          </div>
          <div className="search-button-div">
             <button className="search-button" tabIndex="0" onClick={submitSearch} >
               Search
             </button>
             <h5 className="submit-warning">
                {submitText}
             </h5>
           </div>
        </div>
    )
}

export default Search
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Adding from './Adding/Adding';
import './List.css';
import Member from './Member/Member';
import Show from './Show/Show';
import Search from './Search/Search';
import Description from './Description/Description'
import Instruction from './Instruction/Instruction';

function List(){
  // const [results,setResults] = useState([])
  const [wasResult,setWasResult] = useState()
  const [instructionStatus, setInstructionStatus] = useState(false)
  const [instruction,setInstruction] = useState("")

  const results = useRef()
  // selectors
  const membersList = useSelector((state)=>{
    return state.users
  })
   
  const searchResults = useSelector((state) => {
    return state.searchResults
  })
    
  useEffect(() => {
    results.current = searchResults
      if(results.current.length === 0){
        setWasResult()
        setTimeout(() => {
          setWasResult(false)
          setInstructionStatus(true)
          setInstruction("Loading...")
          setTimeout(() => {
            setInstruction("No result!")
          }, 750)
        }, 100)
      }
      else if(results.current.length !== 0){
        setWasResult()
        setTimeout(() => {
          setWasResult(true)
          setInstructionStatus(true)
          setInstruction('Loading...')
          setTimeout(() => {
            setInstruction(`${results.current.length} results found.`)
          }, 750)
        }, 100)
      }
   
  }, [searchResults])

  useEffect(() => {
     setWasResult(false)
     setInstruction(`${membersList.length} results found.`)
  }, [membersList])


  return(
    <div className="list-div">
      <Adding />
      <Show />
      {/* <Edit /> */}
      <h1>Members' list</h1>
      <div className="members-list">
        <Search />
        <Description />
        <div className="members-display-div">
         {/* maping members in the list  */}
         {(wasResult) ? 
         results.current.map((results, index) => 
         <Member key={index} id={results.id} name={results.name} surname={results.surname} age={results.age} />
                   )
         :
           membersList.map((membersList, index) => 
            <Member key={index} id={membersList.id} name={membersList.name} surname={membersList.surname} age={membersList.age} />
                   )
         }
         {(instructionStatus) ? 
         <Instruction instruction={instruction}/> 
         : null }
        </div>

      </div>
    </div>
  )
}

export default List
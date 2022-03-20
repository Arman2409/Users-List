import {createStore} from 'redux';



const store = createStore(

  function(state, action){

    //  adding member form 
   if(action.type === "toggleForm"){
     return{
      ...state,
      formStatus:action.payload,
      editStatus:false,
      showStatus:false,    
     }
    }

    if(action.type === "submit"){
      state.users.push({...action.payload.user,id:state.users.length + 1})
      state.users = [...state.users]
      console.log(state.users);
      return{
         ...state,
         formStatus:'closed',
       }
     }
          
     //   deleting member 

     if(action.type === "delete"){
       state.users = state.users.filter((el,index) => {
         return index !== action.payload - 1
       })
       for(var i = 0; i < state.users.length; i++){
         state.users[i].id = i + 1
       }
       console.log(state.users);

       return{
         ...state,
       }
     }

    // show member form 

    if(action.type === "show"){
      state.show = state.users[action.payload - 1]
      state.show.index = action.payload - 1
      
      return{
         ...state,
         formStatus:'closed',
         editStatus:false,
         showStatus:true,
       }
    }

     if(action.type === "close show"){

        return{
          ...state,
          showStatus:false,
         }
       }
          
      //  edit form 
            
     if(action.type === "edit"){
       state.currentEdit = state.users[action.payload - 1]
       state.currentEdit.index = action.payload - 1

        return{
           ...state,
            editStatus:true,
            formStatus:'closed',
            show:{showStatus:false},
        }
      }

    if(action.type === "close edit"){
       return{
         ...state,
         editStatus:false
        }
     }

    if(action.type === "new edit"){
        state.users[action.payload.id - 1] = action.payload.user
        state.users[action.payload.id - 1].id = action.payload.id
        state.users = [...state.users]
        return{
           ...state,
            editStatus:false,
        }
     }
    
    
    if(action.type === "search results"){
      console.log(action.payload);
      console.log(action.payload);
      return{
        ...state,
        searchResults:action.payload,
      }
    }
     return state
 },
 
{
   users:[{id:1,name:"Karen",surname:"Hovsepyan",age:21},
      {id:2,name:'Armine',surname:'Sargsyan',age:24},
      {id:3,name:'Vazgen',surname:'Andreasyan',age:24}
        ],
   formStatus:false,
   show:'',
   currentEdit:{},
   searchResults: [{id:1,name:"Karen",surname:"Hovsepyan",age:21},
                    {id:2,name:'Armine',surname:'Sargsyan',age:24},
                    {id:3,name:'Vazgen',surname:'Andreasyan',age:24}
                  ],
   editStatus:false,
   showStatus:false,
}
)

export default store
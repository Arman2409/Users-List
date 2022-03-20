import React from 'react';
import './Main.css';
import List  from './List/List';
import Edit from './Edit/Edit';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'

function Main(){
  return(
    <Router>
      <Switch>
        <Route exact path="/" children={<List /> }></Route>
        <Route path={`/edit`} children={<Edit />}></Route>
      </Switch>
    </Router>
  )
}

export default Main
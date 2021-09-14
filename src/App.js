import React from 'react';
import './App.css';
import styled from "styled-components"

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Chat from './components/Chat'
import Login from './components/Login'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from './firebase';


function App() {
  const [user,loading] = useAuthState(auth);

  if(loading){
    return (
      <AppLoading>
        <AppLoadingContents>
          loading...
        </AppLoadingContents>
      </AppLoading>
    )

  }
  return (
    <div className="App">
      <Router>
        {!user ? (        
          <Login />          
        ) :(
         <>
        <Header /> 
        <AppBody>
          <Sidebar />
          <Switch>            
            <Route path="/">
              {/* Chat */}
              <Chat />
              
            </Route>
          </Switch>
        </AppBody>
        </>
        )}
    </Router>
          

    </div>
  );
}

export default App;


const AppBody = styled.div`
  display:flex;
  height: 100vh;
  /* overflow-y: scroll;  */
`;

const AppLoading = styled.div`

`;
const AppLoadingContents = styled.div`

`;


import React from 'react';

import { auth } from "./api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import './App.css';


import Timer from './timer'

const App = ()=> {

  const {initialising, user } = useAuthState(auth)

  const [timerId, changecode] = React.useState(null)
  const [showTimer, toggleTimer] = React.useState(false)

    React.useEffect(
      ()=>{ auth.signInAnonymously()},
      [user],
    )


    return (
      <div className="App">
        {!showTimer && <div className="timer-picker">
          <input
            type="text"
            value={timerId || ''}
            placeholder="Enter a timer ID"
            onChange={({target: {value}})=>changecode(value)}
          />
          <button onClick={()=>toggleTimer(true)}>Submit</button>
        </div>}
        {user && showTimer && <Timer timerId={timerId} />}
      </div>
    );
  }

export default App;

import React from 'react';
import {Button } from '@material-ui/core'
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, firestore } from "./api/firebase";
import getId from './util/get-id'
import './App.css';


import Timer from './timer'

const App = ()=> {

  const { user } = useAuthState(auth)

  const [timerId, changeCode] = React.useState(null)
  const [showTimer, toggleTimer] = React.useState(false)

  const onCodeChange = code=>changeCode(code.toUpperCase())

    React.useEffect(
      ()=>{ auth.signInAnonymously()},
      [user],
    )

    const newTimer = () => {
      const id = getId()
      const collection = firestore.collection('timers')
      collection.doc(id).set({ remaining: 0}).then(()=>{
        onCodeChange(id)
        toggleTimer(true)
      })

    }


    return (
      <div className="App">
        {!showTimer && <div className="timer-picker">
          <input
            type="text"
            value={timerId || ''}
            placeholder="Enter a timer ID"
            onChange={({target: {value}})=>onCodeChange(value)}
          />
          <Button onClick={()=>toggleTimer(true)}>Submit</Button>
          <Button onClick={newTimer}>Create New</Button>
        </div>}
        {user && showTimer && <Timer timerId={timerId} goBack={()=>toggleTimer(false)} />}
      </div>
    );
  }

export default App;

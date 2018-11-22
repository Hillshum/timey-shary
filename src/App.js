import React from 'react';
import {Button } from '@material-ui/core'
import { useAuthState } from "react-firebase-hooks/auth";

import MuteContext from './api/mute-context'
import { auth, firestore } from "./api/firebase";
import getId, {POSSIBLE} from './util/get-id'
import './App.css';

import Timer from './timer'

const filterRe = new RegExp(`[^${POSSIBLE}]`, 'g')

const App = ()=> {

  const { user } = useAuthState(auth)

  const [timerId, changeCode] = React.useState(null)
  const [showTimer, toggleTimer] = React.useState(false)
  const [isMuted, toggleMute] = React.useState(false)

  const onCodeChange = code=>{
    changeCode(code.toUpperCase().replace(filterRe, ''))
  }

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
      <MuteContext.Provider value={isMuted}>
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
          <Button onClick={()=>toggleMute(!isMuted)}>{isMuted ? 'Unmute' : 'Mute'}</Button>
        </div>
      </MuteContext.Provider>
    );
  }

export default App;

import React from 'react';
import {Button } from '@material-ui/core'
import { useAuthState } from "react-firebase-hooks/auth";

import MuteContext from './api/mute-context'
import { auth, firestore } from "./api/firebase";
import getId, {POSSIBLE} from './util/get-id'
import usePath from './util/use-path'
import './App.css';

import Timer from './timer'

const filterRe = new RegExp(`[^${POSSIBLE}]`, 'g')

const App = ()=> {

  const { user } = useAuthState(auth)

  const [backMessage, setBackMessage] = React.useState('')
  const [timerId, changeCode] = React.useState(null)
  const [isMuted, toggleMute] = React.useState(false)

  const [timerPath, setPath] = usePath()

  const onCodeChange = code=>{
    setBackMessage('')
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
        setPath(id)
      })

    }

    const goBack = (message='') => {

      changeCode('')
      setPath('')
      setBackMessage(message)
    }


    return (
      <MuteContext.Provider value={isMuted}>
        <div className="App">
          {!timerPath && <div className="timer-picker">
            <input
              type="text"
              value={timerId || ''}
              placeholder="Enter a timer ID"
              onChange={({target: {value}})=>onCodeChange(value)}
            />
            <Button disabled={!timerId} onClick={()=>setPath(timerId)}>Submit</Button>
            <Button onClick={newTimer}>Create New</Button>
            {backMessage && <div className="back-message">{backMessage}</div>}
          </div>}
          {user && timerPath && <Timer timerId={timerPath} goBack={goBack} />}
          <Button onClick={()=>toggleMute(!isMuted)}>{isMuted ? 'Unmute' : 'Mute'}</Button>
        </div>
      </MuteContext.Provider>
    );
  }

export default App;

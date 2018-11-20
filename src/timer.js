import React from 'react';
import {useDocument} from 'react-firebase-hooks/firestore'
import {Button } from '@material-ui/core'

import firebase from 'firebase/app' 

import DurationView from './components/duration-view'
import TimeEdit from './components/time-edit'
import { firestore } from "./api/firebase";


const Timer = ({timerId})=> {

  const collection = firestore.collection('timers')

  const {error, loading, value} = useDocument(collection.doc(timerId))
  let target, remaining
  const ready = !error && !loading && value
  if (ready) {
    const data = value.data()
    target = data.target ? data.target.toDate() : null
    remaining = data.remaining
  }

  const editRemaining = remaining=> {
    value.ref.set({remaining})
    
  }

  const start = ()=> {
    const millis = remaining + Number(new Date())
    console.log(millis)
    const newTarget = firebase.firestore.Timestamp.fromMillis(millis)
    console.log(newTarget)
    value.ref.set({target: newTarget} )
  }
  const pause = ()=> {
    value.ref.set({remaining: target - (new Date())})
  }

  const paused = remaining !== undefined


  return <div>
    {ready && <>
      {target && <DurationView target={target}/>}
      {paused && <TimeEdit remaining={remaining} onChange={editRemaining}/>}
      {paused ? 
        <Button onClick={start} disabled={remaining === 0}>Start</Button>
      : <Button onClick={pause}>Pause</Button>}
      
    </>}

  </div>
}

export default Timer
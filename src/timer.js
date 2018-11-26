import React from 'react';
import {useDocument} from 'react-firebase-hooks/firestore'
import {Button } from '@material-ui/core'

import firebase from 'firebase/app' 

import DurationView from './components/duration-view'
import TimeEdit from './components/time-edit'
import Loading  from './components/loading'
import CopyCode from './components/copy-code'
import { firestore } from "./api/firebase";


const Timer = ({timerId, goBack})=> {

  const collection = firestore.collection('timers')

  const {error, loading, value} = useDocument(collection.doc(timerId))

  if (error) {
    console.error(error)
    return <div>Something broke</div>
  }

  if (loading) return <Loading/>

  if (!value.exists) {
    goBack(`Timer ${timerId} not found`)
    return null
  }

  const data = value.data()
  const target = data.target ? data.target.toDate() : null
  const remaining = data.remaining

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
      <CopyCode code={timerId}/>
      {target && <DurationView target={target}/>}
      {paused && <TimeEdit remaining={remaining} onChange={editRemaining}/>}
      {paused ? 
        <Button onClick={start} disabled={remaining === 0}>Start</Button>
      : <Button onClick={pause}>Pause</Button>}
      
      <Button onClick={()=>goBack()}>Go Back</Button>

  </div>
}

export default Timer
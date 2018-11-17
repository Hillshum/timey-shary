import React from 'react';
import {useDocument} from 'react-firebase-hooks/firestore'

import { firestore } from "./api/firebase";


const Timer = ({timerId})=> {

  const collection = firestore.collection('timers')

  const {error, loading, value} = useDocument(collection.doc(timerId))
  if (!error && !loading && value) {
    const {target} = value.data()
    return <div>
      {target.toString()}

    </div>
  }
  return null
}

export default Timer
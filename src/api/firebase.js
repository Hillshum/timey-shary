import fbConfig from '../config/firebase'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp(fbConfig)

export const database = firebase.database()

const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}

firestore.settings(settings)

export {firestore}

export const auth = firebase.auth()
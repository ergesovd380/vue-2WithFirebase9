import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCAi3ledsTe6yBSnDLJ_1fhDp69IAfmYk4',
  authDomain: 'vuetify-etc.firebaseapp.com',
  databaseURL: 'https://vuetify-etc-default-rtdb.firebaseio.com',
  projectId: 'vuetify-etc',
  storageBucket: 'vuetify-etc.appspot.com',
  messagingSenderId: '69171486865',
  appId: '1:69171486865:web:2f106c933b8fcc93ec5f30'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export {
  db, app, storage
}

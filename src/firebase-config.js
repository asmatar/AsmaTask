// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZbkbnDNevo9D06BdYE9zyzX1pH2Vy674',
  authDomain: 'asma-task.firebaseapp.com',
  databaseURL:
    'https://asma-task-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'asma-task',
  storageBucket: 'asma-task.appspot.com',
  messagingSenderId: '206344080668',
  appId: '1:206344080668:web:5f15ca2c6a14561e463ed9',
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
export { db, auth }
/* export default app */

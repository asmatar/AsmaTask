import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'
import { auth } from '@/firebase-config'
const userAuthContext = createContext()

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState('')

  const signUp = (email, password, name) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential
        updateProfile(user, { displayName: name }).then(() => {})
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  const logOut = () => {
    return signOut(auth)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [user])
  const value = {
    login,
    logOut,
    user,
    signUp,
  }
  return (
    <userAuthContext.Provider value={value}>
      {children}
    </userAuthContext.Provider>
  )
}

export function useUserAuth() {
  return useContext(userAuthContext)
}

/* 

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Update the user's displayName
    userCredential.user.updateProfile({
      displayName: 'Arthur'
    }).then(() => {
      // displayName updated successfully
    }).catch((error) => {
      // Error updating displayName
    });
  })
  .catch((error) => {
    // Handle errors while creating the user
  });
*/

import React, {useState, useEffect} from 'react'
import initFirebase from '../services/firebase'
import firebase from 'firebase/app';
import 'firebase/auth'

initFirebase();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const emailProvider = new firebase.auth.EmailAuthProvider();
// provider.addScope(...)

const useFirebaseAuthentication = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() =>{
       const unlisten = firebase.auth().onAuthStateChanged(
          (authUser) => {
              authUser ? setAuthUser(authUser) : setAuthUser(null);
          },
          (error) => {
              
          }
       );
       return () => {
           unlisten();
       }
    });

    const signIn = (provider, options = {}) => {
        const { method = 'signInWithPopup' } = options;
        const validMethods = ['signInWithRedirect', 'signInWithPopup'];
        if (!validMethods.includes(method)) throw new Error(`The selected method ${method} is not accepted.`);
        firebase.auth()[method](provider);
    }

    return [authUser]
}

export default useFirebaseAuthentication;
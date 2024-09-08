import { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB} from '../../firebase.config';
import { useState, createContext, useEffect, useRef } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { collection, getDocs, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';

export const AuthenticationContext = createContext();

const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [authToken, setAuthToken] = useState(null);

    useEffect(() =>{
        try {
            onAuthStateChanged(FIREBASE_AUTH, (user) =>{
                if(user) {
                    setUser(user);
                }   else {
                    setUser(null);
                }
            })
        } catch (error){
            console.log(error);
        }
    }, []);

    useEffect(() => {
        setError('');
        console.log('error reset')
      }, [user]);

    useEffect(() => {                                                           //initialize and checks for Databaze
        if (!FIRESTORE_DB) {
          // Firestore has not been initialized
          console.log('Firestore has not been initialized');
        } else {
          // Firestore has been initialized
          console.log('Firestore has been initialized');
        }
      }, []);

      const getSubscriptionStatus = async (uid) => {                            //gets subscription status from Firebase 
        const userRef = doc(collection(FIRESTORE_DB, 'customers'), uid);
        const userDoc = await getDoc(userRef);
      
        if (userDoc.exists()) {
          const subscriptionsRef = collection(userDoc.ref, 'subscriptions');
          const subscriptionsSnapshot = await getDocs(subscriptionsRef);
      
          if (subscriptionsSnapshot.empty) {
            console.log('No subscriptions found');
            return false;
          } else {
            const subscription = subscriptionsSnapshot.docs[0].data();
            console.log(subscription);
            return subscription;
          }
        } else {
          return false;
        }
      };

      const handleSignIn = (email, password) => {
        setIsLoading(true);
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((userCredential) =>{
          const user = userCredential.user;
          storeToken(user.uid); // Store the token using AsyncStorage
          setIsLoading(false);
          // Only set the user if the sign-in is successful
          setUser(user);
        })
        .catch((e) => {
          setIsLoading(false);
          let errorMessage = error.message;
    
          if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
            errorMessage = 'The password is incorrect. Please try again.';
          } else if (error.code === AuthErrorCodes.USER_DISABLED) {
            errorMessage = 'The user account has been disabled. Please contact support.';
          } else if (error.code === AuthErrorCodes.USER_NOT_FOUND) {
            errorMessage = 'The user account does not exist. Please sign up.';
          }
    
          setError(errorMessage);
          setUser(null);
        });
      };

      const onRegister =  (email, password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
          setError('Error: Passwords do not match');
        setIsLoading(false);
        return;
        }
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setIsLoading(false);
          const userRef = doc(collection(FIRESTORE_DB, 'users'), user.uid);
          setDoc(userRef, { email: user.email, subscription: false });
          // Only set the user if the registration is successful
          setUser(user);
        })
        .catch((error) => {
          let errorMessage = error.message;
          setIsLoading(false);
          if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
            errorMessage =
              'The email is already in use. Please sign in or use a different email.';
          } else if (
            error.code === AuthErrorCodes.WEAK_PASSWORD ||
            error.code === AuthErrorCodes.OPERATION_NOT_ALLOWED 
          ) {
            errorMessage =
              'The password is not strong enough. Please choose a different password.';
          } else if (error.code === AuthErrorCodes.INVALID_EMAIL) {
            errorMessage = 'The email address is invalid. Please provide a valid email address.';
          }else if (error.code === AuthErrorCodes.USER_DISABLED) {
            errorMessage = 'The user account has been disabled. Please contact support.';
          } else if (error.code === AuthErrorCodes.USER_NOT_FOUND) {
            errorMessage = 'The user account does not exist. Please sign up.';
          } else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
            errorMessage = 'The password is incorrect. Please try again.';
          } else if (error.code === 'auth/missing-password') {
            errorMessage = 'The password is missing. Please provide a password.';
          }
    
          setError(errorMessage);
          setUser(null);
        });
      };
    


}
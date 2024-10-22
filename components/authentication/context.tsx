import { useState, createContext, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, AuthErrorCodes} from "firebase/auth";
import { FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB } from '@/firebase.config';
import { collection, getDocs, addDoc, setDoc, doc, getDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { useRouter } from "expo-router";
import { Alert } from "react-native";


export const AuthenticationContext = createContext(undefined);

export const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorLogin, setErrorLogin] = useState('');
    const [errorRegister, setErrorRegister] = useState('');
    const [ stripeRoleStatus, setStripeRoleStatus] = useState<string | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
      setErrorLogin('');
      setErrorRegister('');
      console.log('error reset')
    }, [user]);

    const login = (email, password) => {
      setLoading(true);
      signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) =>{
        const user = userCredential.user;
        setLoading(false);
        // Only set the user if the sign-in is successful
        setUser(user);
      })
      .catch((e) => {
        setLoading(false);
        let errorMessage = e.message;
        if (e.code === AuthErrorCodes.INVALID_PASSWORD) {
          errorMessage = 'The password is incorrect. Please try again.';
        } else if (e.code === AuthErrorCodes.USER_DISABLED) {
          errorMessage = 'The user account has been disabled. Please contact support.';
        } else if (e.code === AuthErrorCodes.NULL_USER) {
          errorMessage = 'The user account does not exist. Please sign up.';
        } else if (e.code === AuthErrorCodes.INVALID_EMAIL) {
          errorMessage = 'The email address is invalid. Please try again.';
        } else if (e.code === AuthErrorCodes.INVALID_PASSWORD) {
          errorMessage = 'The password is incorrect. Please try again.';
        }
  
        setErrorLogin(errorMessage);
        setUser(null);
      });
    };

    const register =  (email, password, repeatedPassword) => {
      setLoading(true);
      if (password !== repeatedPassword) {
        setErrorRegister('Error: Passwords do not match');
      setLoading(false);
      return;
      }
      createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        console.log(email + ' is being added to firestore')
        const userRef = doc(collection(FIRESTORE_DB, 'users'), user.uid);
        setDoc(userRef, { email: user.email, subscription: false });
        Alert.alert('You have been succesfully registered')
        router.replace('/(authentication)/login')
        // Only set the user if the registration is successful
      })
      .catch((error) => {
        let errorMessage = error.message;
        setLoading(false);
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
        } else if (error.code === AuthErrorCodes.NULL_USER) {
          errorMessage = 'The user account does not exist. Please sign up.';
        } else if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
          errorMessage = 'The password is incorrect. Please try again.';
        } else if (error.code === 'auth/missing-password') {
          errorMessage = 'The password is missing. Please provide a password.';
        }
        setErrorRegister(errorMessage);
        if(errorMessage==='') {
        Alert.alert(errorRegister)
      } else {
        Alert.alert('Registration failed')
      }
      });
    };

  const logout = async () => {
    setLoading(true); // Optional: if you want to show a loading indicator during logout
    try {
      await signOut(FIREBASE_AUTH);
      console.log("User signed out successfully");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      alert("An error occurred while signing out. Please try again.");
    } finally {
      setLoading(false); // Reset loading state if you're using one
    }
  };

  const getStripeRole = () => {
    return FIREBASE_AUTH.currentUser
      ?.getIdToken(true)
      .then(() => {
        return FIREBASE_AUTH.currentUser?.getIdTokenResult();
      })
      .then((decodedToken) => {
        try {
          if (user) {
          const stripeStatus = decodedToken?.claims.stripeRole;
          console.log("Token is this StripeRole: ", stripeStatus);
          if (stripeStatus === "premium") {
            // Do something for premium user
            console.log('stripeStatus is premium')
            setStripeRoleStatus(stripeStatus);
          } else if (!stripeStatus) {
            // Do something for non-premium user
            console.log('Stripe status is basic')
            setStripeRoleStatus('basic');
          }
          return stripeStatus || 'basic'; // Ensure 'basic' is returned if stripeStatus is undefined
        }
        } catch (error) {
          console.log("Error getting Stripe role:", error);
        }
      
      })
      .catch((error) => {
        console.error("Error fetching or decoding token:", error);
        setStripeRoleStatus('basic');
        return 'basic';
      });
  };

  return (
    <AuthenticationContext.Provider value={{isAuthenticated:!!user, user, login, register, logout, loading, errorLogin, errorRegister, getStripeRole }}>
      {children}
    </AuthenticationContext.Provider>
  );


}
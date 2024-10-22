import { Diagram } from "./crochetDiagramType";
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { collection, getDocs, addDoc, setDoc, doc, getDoc, query, where, deleteDoc } from 'firebase/firestore';
import { FIRESTORE_DB, FIREBASE_AUTH } from "@/firebase.config";
import { Alert } from "react-native";
import { AuthenticationContext } from "../authentication/context";
import { DiagramInfoContext } from "./CrochetDiagramInfoContext";


export const DiagramContext = createContext(undefined);

export const DiagramProvider = ({ children } ) => {
    const [diagrams, setDiagrams] = useState<Diagram[]>([]);
    const [loading, setLoading] = useState(false);
    const [test, setTest] = useState('')
    const {getStripeRole} = useContext(AuthenticationContext)
    const [stripeRoleStatus, setStripeRoleStatus] = useState('')
    const {  diagramField, setDiagramField } = useContext(DiagramInfoContext)
    


    useEffect(() => {
      const fetchStripeRole = async () => {
        try {
          const role = await getStripeRole(); // Assuming getStripeRole is a function that returns a promise
          setStripeRoleStatus(role); // Update state with the fetched role
        } catch (error) {
          console.error('Error fetching stripe role:', error);
          setStripeRoleStatus('basic'); // Set a default value in case of error
        }
      };
    
      fetchStripeRole();
    }, []);


    const addDiagram = async (diagramField) =>{
    try {
      const stripeRoleStatus = getStripeRole()
        const userDocRef = doc(FIRESTORE_DB, `customers/${FIREBASE_AUTH.currentUser?.uid}`);
        const diagramsRef = collection(userDocRef, 'diagrams');
        const diagramsSnapshot = await getDocs(diagramsRef);
        const diagramCount = diagramsSnapshot.size;
        if(stripeRoleStatus == "basic") {
        if(diagramCount<setCount){
          await addDoc(diagramsRef, diagramField);
          Alert.alert(
            'Success',
            'Diagram added successfully',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              }
            ], 
            { cancelable: false }
          )
        } 
        else {
          Alert.alert(
            'Maximum Diagrams Reached',
            'You have reached the maximum number of diagrams(3). Please delete some diagrams to add new ones.',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ],
            { cancelable: false }
          )
        }}
        else {
          await addDoc(diagramsRef, diagramField);
          Alert.alert(
            'Success',
            'Diagram added successfully',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              }
            ], 
            { cancelable: false }
          )
    
        }
        } catch (error) {
          console.log('Error adding diagram to Firestore: ', error);
        }
    }

const handleTest = async () => {
     setTest('test')
     console.log(test)
}

return (
    <DiagramContext.Provider value={{diagrams, addDiagram, loading, handleTest}}>
        {children}
    </DiagramContext.Provider>
)
}
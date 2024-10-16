import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { AuthenticationContext } from '@/components/authentication/context';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '@/components/custom/background';
import DismissingKeyboardWrapper from '@/components/custom/DismissingKeyboardWrapper';

export default function RegisterScreen() {
  const { register, errorRegister, loading } = useContext(AuthenticationContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [error, setError] = useState('')

  return (
    <Background>
    <DismissingKeyboardWrapper>
    <View style={styles.container}>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        mode='outlined'
        style={{margin:5}}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        mode='outlined'
        style={{margin:5}}
      />
        <TextInput
        value={repeatedPassword}
        onChangeText={setRepeatedPassword}
        placeholder="Repeat Password"
        secureTextEntry
        mode='outlined'
        style={{margin:5}}
      />
      <Button mode='elevated' onPress={() => register(email, password, repeatedPassword)}
      style={{
        borderRadius: 10, // Add this line
        borderColor: '#ccc', // Optional: add a border color
        borderWidth: 1, // Optional: add a border width
        marginTop:10
      }}>
        <Text style={{fontSize:18, fontWeight:'bold'}}>
          Register
        </Text>
        </Button>

      {errorRegister && <Text>{errorRegister}</Text>}
    </View>
    </DismissingKeyboardWrapper>
    </Background>
  );
}

const { width, height } = Dimensions.get('window');  // Get screen width and height


const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      marginLeft:width * 0.10,
      marginRight:width * 0.10,
      
    },
  
    loginButton: {
      margin: 20
    }, 
    registerContainer: {
      textAlign:"center"
    }
  
  })
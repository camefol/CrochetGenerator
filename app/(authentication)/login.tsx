import { useContext, useState } from 'react';
import { AuthenticationContext } from '@/components/authentication/context'; // Adjust path
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native';
import { TextInput, Button  } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '@/components/custom/background';
import DismissingKeyboardWrapper from '@/components/custom/DismissingKeyboardWrapper';

export default function LoginScreen() {
  const { login, loading, errorLogin} = useContext(AuthenticationContext);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (e) {
      console.log("Login failed:", e.message);  // Debugging log

    }
  };

  const handleRegisterRedirect = () => {
    router.push('/(authentication)/register')
  }

  return (
    <Background>
    <DismissingKeyboardWrapper>
    <View style={styles.container}>
      <TextInput style={{margin:2}}  value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" mode='outlined' left={<TextInput.Icon icon="email"/>}/>
      <TextInput style={{margin:2}} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry mode='outlined' />
      <View style={styles.loginButton}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ): (
      <Button onPress={handleLogin} mode='elevated' style={{
    borderRadius: 10, // Add this line
    borderColor: '#ccc', // Optional: add a border color
    borderWidth: 1, // Optional: add a border width
  }}>
    <Text style={{fontSize:20, fontFamily:'Arial', color:'black'}}>
      Login
    </Text>
  </Button>
  ) }
      </View>
      <Text style={styles.registerContainer}>Don't have an account?</Text>
      <Button mode='contained' onPress={handleRegisterRedirect} >Register</Button>
      {errorLogin && <Text>{errorLogin}</Text>}
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
    textAlign:"center",
    color:'black',
  }

})
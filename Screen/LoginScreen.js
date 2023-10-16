import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';


const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 

  const handleLogin = async() => {
    if(email.length<=0){
        alert('please enter email');
        return;
    }else if(password.length<=0){
        alert('please enter password');
        return;
    }else{
        try {
            await signInWithEmailAndPassword(auth ,email, password)
            .then((userCredential)=>{
              console.log('dang nhap thanh cong');
            })
        } catch (error) {
            console.log('error: ',error);
        }
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
      behavior="padding"
    >
      
    <Text style={styles.logo}>
        LOGIN
    </Text>

    <View style={styles.inputContainer}>

     <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity title="Register" onPress={() => navigation.navigate('Register')} style={[styles.button]}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E2A53'
  },
  logo: {
    marginBottom: 85,
    fontSize: 50,
    fontWeight: 'bold'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})

export default LoginScreen
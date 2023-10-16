import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { ref, set } from 'firebase/database';

const RegisterScreen = ({navigation}) => {

  
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');


  const handleAddUser = async() => {
    try {
        if(email.length<=0){
            alert('please enter email');
            return;
        }else if(password.length<=0){
            alert('please enter password');
            return;
        }else if(checkPassword.length<=0){
            alert('please enter check password');
            return;
        }else if(checkPassword!==password){
            alert('password and check password are not the same');
            return;
        }else{
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential)=>{
                const user = userCredential.user;
                const userData = {
                    type: 2,
                    userName: 'Người dùng',
                    image: '',
                };
                const userRef = ref(db, 'users/'+user.uid);
                set(userRef,userData);
            })
        }
    } catch (error) {
        console.log('error: ', error);
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
      behavior="padding"
    >
      
    <Text style={styles.logo}>
        REGISTER
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
        <TextInput
          placeholder="Re-Password"
          value={checkPassword}
          onChangeText={text => setCheckPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      

      <View style={styles.buttonContainer}>

        <TouchableOpacity onPress={handleAddUser} style={[styles.button, styles.button]}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Go back" onPress={() => navigation.goBack()} style={[styles.button]}>
          <Text style={styles.buttonText}>Back</Text>
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

export default RegisterScreen
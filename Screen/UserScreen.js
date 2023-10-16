import { Text, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { signOut } from 'firebase/auth'
import { auth, db } from '../config/firebase'
import useAuth from '../hooks/useAuth'
import { Button } from 'react-native-paper'
import { get, ref } from 'firebase/database'

const UserScreen = ({navigation}) => {
  
  const [type, setType] = useState(2);

  useEffect(() => {
    if(user.user!=null){
      const userRef = ref(db, 'users/'+user.user.uid);
      get(userRef)
      .then((snapshot)=>{
        if(snapshot.exists){
          const userData = snapshot.val();
          setType(userData.type);
          console.log(userData);
        }
      })
    }
  }, [user])

  const handelSignOut = async() => {
    await signOut(auth);
    console.log(auth);
  }

  const user = useAuth()
  if(user.user){
    return (
      <SafeAreaView style={{flex: 1, marginTop: 35}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 28, marginBottom: 10}}> Email: 
          {user.user.email}
        </Text>
        {
          user.user.email == 'admin@admin.com'
          ? <TouchableOpacity onPress={() => navigation.navigate('Manage')} style={{backgroundColor: '#0782F9', width: '95%', padding: 10, margin: 10, borderRadius: 10, alignItems: 'center',}}>
              <Text style={{ color: 'white',fontWeight: '700',fontSize: 16}}>Manage</Text>
          </TouchableOpacity>
          : null
        }
        <TouchableOpacity onPress={handelSignOut} style={{backgroundColor: '#0782F9', width: '95%', padding: 10, margin: 10, borderRadius: 10, alignItems: 'center',}}>
            <Text style={{ color: 'white',fontWeight: '700',fontSize: 16}}>Log out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }else{
    return(
      <SafeAreaView style={{flex: 1,}}>
        <Text>
            ban chua dang nhap
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{backgroundColor: '#0782F9', width: '95%', padding: 10, margin: 10, borderRadius: 10, alignItems: 'center',}}>
            <Text style={{ color: 'white',fontWeight: '700',fontSize: 16}}>Sign In</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

}


export default UserScreen


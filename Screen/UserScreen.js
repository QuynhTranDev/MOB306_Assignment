import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const UserScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1,}}>
      <Text style={{fontSize: 35, justifyContent: 'center', alignItems: 'center', marginTop: 35, marginBottom: 10, marginLeft: 25}}>
        User: ???
      </Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 28, marginBottom: 10}}>
        Email: ???
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('')} style={{backgroundColor: '#0782F9', width: '95%', padding: 10, margin: 10, borderRadius: 10, alignItems: 'center',}}>
          <Text style={{ color: 'white',fontWeight: '700',fontSize: 16}}>About</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{backgroundColor: '#0782F9', width: '95%', padding: 10, margin: 10, borderRadius: 10, alignItems: 'center',}}>
          <Text style={{ color: 'white',fontWeight: '700',fontSize: 16}}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


export default UserScreen


import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView sytle={styles.container}>
      <Text style={styles.logo}>HOME</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style = {styles.iconWarp}>
            <Text style = {styles.icon}>
                +
            </Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#94D1FF'
  },
  logo: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  iconWarp: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#B8F6E7',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    left: 350,
    top: 500,
  },
  icon: {
    fontWeight: '600',
    fontSize: 30,
  },
})

export default HomeScreen
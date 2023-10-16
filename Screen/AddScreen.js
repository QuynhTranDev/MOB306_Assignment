import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ref, set } from 'firebase/database'
import { db } from '../config/firebase'

const AddScreen = ({navigation}) => {

  const [blogName, setBlogName] = useState('')
  const [blogPost, setblogPost] = useState('')

  const handleAdd = () => {
    const id = `${Date.now()}-${Math.floor(Math.random()*1000)}`;
    const newBlog = {
      id: id,
      blogName: blogName,
      blogPost: blogPost,
    }
    const blogRef = ref(db, 'blogs/'+id);
    set(blogRef, newBlog)
    .then(()=>{
      console.log('them blog thanh cong');
    })
    .catch((error)=>{
      console.log('error: ',error);
    })
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.logo}>
            ADD
        </Text>
        <View style={styles.inputContainer}>
            <TextInput placeholder="Name" style={styles.input} value={blogName} onChangeText={text=>setBlogName(text)}/>
            <TextInput placeholder="Post" style={[styles.input, {maxHeight: 400, height: 400}]} value={blogPost} onChangeText={text=>setblogPost(text)}/>
            <TouchableOpacity style={{backgroundColor: 'blue'}} onPress={handleAdd}>
              <Text>
                Add
              </Text>
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
        backgroundColor: '#94D1FF'
    },
    logo: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 35,
    },
    inputContainer: {
        width: '80%',
      },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 1,
      },
    button: {
        backgroundColor: '#0782F9',
        width: '20%',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 270,
        marginTop: 25,
      },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
      },
})

export default AddScreen
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAuth from '../hooks/useAuth'
import { get, onValue, ref } from 'firebase/database'
import { db } from '../config/firebase'

const HomeScreen = ({navigation}) => {

  const [type, setType] = useState(2);
  const [blogs, setBlogs] = useState([{blogName: '123', blogPost: '123'}])

  const user = useAuth();

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

  useEffect(() => {
    const blogRef = ref(db, 'blogs')
    onValue(blogRef, (snapshot)=>{
      if(snapshot.exists){
        console.log(snapshot);
        const blogStr = snapshot.val();
        setBlogs(Object.values(blogStr))
        console.log(blogs);
      }
    })
  }, [])
  

  const renderItem = ({item}) => {

    const handleSeeMore = () => {
      navigation.navigate('Blog', {item: item});
    }

    return(
      <TouchableOpacity onPress={handleSeeMore} style={styles.blogContainer}>
        <Text style={styles.blogName}>
          {item.blogName}
        </Text>
        <Text style={styles.blogPost}>
          {item.blogPost}
        </Text>
      </TouchableOpacity>
    )
  }
  

  return (
    <SafeAreaView sytle={styles.container}>
      <View style={styles.top}>
        <Text style={styles.logo}>HOME</Text>
        {
        type == 1
        ? <TouchableOpacity
          onPress={() => navigation.navigate('Add')}
          style = {styles.iconWarp}>
              <Text style = {styles.icon}>
                  +
              </Text>
        </TouchableOpacity>
        : null
        }
      </View>
      <FlatList
        data={blogs}
        renderItem={renderItem}
      />

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
    fontWeight: 'bold',
    width: '85%'
  },
  iconWarp: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#B8F6E7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontWeight: '600',
    fontSize: 30,
  },
  blogContainer:{
    padding: 16,
    borderWidth: 1,
    margin: 8,
    elevation: 8,
    backgroundColor: 'white',
  },
  blogName:{
    fontWeight: 'bold',
    fontSize: 20,
  },
  blogPost:{
    
  },
  top:{
    flexDirection: 'row'
  }
})

export default HomeScreen
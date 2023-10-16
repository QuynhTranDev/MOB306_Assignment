import { FlatList, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, {useEffect, useState} from 'react'
import { get, onValue, ref, remove, update } from 'firebase/database'
import { db } from '../config/firebase'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native-paper'

const ManageScreen = () => {
  const [blogs, setBlogs] = useState([])
  const [isShowDelete, setIsShowDelete] = useState(false)
  const [id, setId] = useState('')

  const [blogName, setBlogName] = useState('')
  const [blogPost, setBlogPost] = useState('')

  useEffect(() => {
    const blogRef = ref(db, 'blogs')
    onValue(blogRef, (snapshot)=>{
      if(snapshot.exists){
        const blogStr = snapshot.val();
        setBlogs(Object.values(blogStr))
      }
    })
  }, [])
  
  const handleDelete = () => {
    const blogRef = ref(db, 'blogs/'+id)
    remove(blogRef)
    .then(()=>{
      setIsShowDelete(!isShowDelete)
      console.log('xoa thanh cong');
      setId('');
    })
    .catch((error)=>{
      console.log('error: ',error);
    })
  }

  const handleUpdate = () => {
    if(id.length<=0){
      alert('please pick blog')
      return
    }
    const blogRef = ref(db, 'blogs/'+id);
    const updateBlog = {
      blogName: blogName,
      blogPost: blogPost,
    }
    update(blogRef, updateBlog)
    .then(()=>{
      alert('update succesfully')
    })
    .catch(()=>{
      console.log('error: ',error);
    })
  }


  const renderItem = ({item}) => {

    const xoa = () => {
      setId(item.id)
      setIsShowDelete(!isShowDelete)
    }

    const getID = () => {
      setId(item.id);
      setBlogName(item.blogName)
      setBlogPost(item.blogPost)
    }

    return(
      <TouchableOpacity onPress={()=>getID()}  style={styles.blogContainer}>
        <Text style={styles.blogName}>
          {item.blogName}
        </Text>
        <Text style={styles.blogPost}>
          {item.blogPost}
        </Text>
        <TouchableOpacity style={styles.modalButton} onPress={()=>xoa()}>
          <Text style={styles.modalButtonContent}>
            Delete
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      
    )
  }

  return (
    <SafeAreaView>
      <TextInput placeholder='blog name' style={styles.input} value={blogName} onChangeText={text=>setBlogName(text)}/>
      <TextInput placeholder='blog post' style={styles.input} value={blogPost} onChangeText={text=>setBlogPost(text)}/>
      <TouchableOpacity onPress={handleUpdate} style={styles.modalButton}>
        <Text style={styles.modalButtonContent}>
          Update
        </Text>
      </TouchableOpacity>
      <FlatList
        data={blogs}
        renderItem={renderItem}
      />
      <Modal
        visible={isShowDelete}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modaContent}>
            <Text style={styles.modalTitle}>
              Do you want to delete this blog?
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={()=>handleDelete()}>
              <Text style={styles.modalButtonContent}>
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setIsShowDelete(!isShowDelete)} style={styles.modalButton}>
              <Text style={styles.modalButtonContent}>
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  modalContainer:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modaContent:{
    padding: 16,
    backgroundColor: 'white',
  },
  modalTitle:{
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
  },
  modalButton:{
    backgroundColor: 'black',
    margin: 8,
  },
  modalButtonContent:{
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  blogContainer:{
    margin: 8,
    padding: 16,
    borderWidth: 1,
  },
  blogName:{
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },
  blogPost:{
    fontSize: 16,
    color: 'gray'
  },
  input:{
    margin: 8,
  }
})

export default ManageScreen

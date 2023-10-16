import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BlogScreen = () => {

    const route = useRoute();
    const item = route.params.item;
    console.log(item);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.blogName}>{item.blogName}</Text>
      <Text style={styles.blogPost}>{item.blogPost}</Text>
    </SafeAreaView>
  )
}

export default BlogScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    blogName:{
        textAlign: 'center',
        fontSize: 30,
        margin: 16,
        fontWeight: 'bold'
    },
    blogPost:{
        fontSize: 20,
        marginHorizontal: 8,
        fontWeight: '500'
    },
})
import { StyleSheet, Text, View, Image, } from 'react-native';
import { Icon, IconButton, ListItem } from '@react-native-material/core';
import React from 'react';

const DrawerItem = ({drawer}) => {

  const handleClose = () => {
    drawer.current.closeDrawer()
  }

  return (
    <View style={styles.container}> 
      <View style={{width: 150, height: 45}} >
        <Image source={require('../../assets/img/drawer_icon/1.png')} style={{width: "100%", height:  "100%"}} />
      </View>
      <View style={styles.item}>
        <Image source={require('../../assets/img/drawer_icon/2.png')} />
        <Text>Notes</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: '100%',
    borderWidth: 1,
    paddingTop: 60
  },
  item: {
    
  }
})

export default DrawerItem;
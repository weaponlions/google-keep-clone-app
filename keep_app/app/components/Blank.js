import { View, Text, Image } from 'react-native';
import React from 'react';

const Blank = () => {
  return (
    <View style={{  height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <View style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Image source={require('../../assets/img/bulb.png')} style={{width: 80, height: 80}} />
        <Text style={{marginTop: 10, fontFamily: 'My_Font' }}>Notes you add appear here</Text>
      </View>
    </View>
  )
}

export default Blank;
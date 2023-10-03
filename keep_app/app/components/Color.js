import { StyleSheet, Text, View, FlatList, } from 'react-native';
import { Button, Avatar, IconButton } from '@react-native-material/core';
import React from 'react';

const data = [
    "red",
    "green",
    "black",
]

const Item = ({code, handleColorValue}) => {
    return(
        <View style={{margin: 5, flex: 1, justifyContent: 'center', alignItems: 'center'}} > 
            <IconButton icon={<Avatar color={code} />} onPress={() => handleColorValue(code)} /> 
        </View>
    )
}

export const Color = ({ handleColorValue }) => {
  return (
    <View> 
        <Text style={{fontFamily: 'My_Font', color: '#d3d3d3', fontWeight: 'bold'}} > COLORS </Text> 
        <View>
            <FlatList
                data={data}
                renderItem={
                    ({ item }) => (
                        <Item code={item} handleColorValue={handleColorValue} />
                    )
                }
                horizontal
            />
        </View>
    </View>
  )
};
 

const styles = StyleSheet.create({});
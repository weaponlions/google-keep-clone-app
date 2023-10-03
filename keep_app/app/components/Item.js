import { View, Text, TouchableOpacity } from "react-native";
import React from "react"; 

const Item = ({ title, description, id, color, navigation, gridView }) => { 
    const handlePress = (id) => { 
        navigation.navigate('notepad', {noteId: id});
    }
  return (
      <TouchableOpacity onPress={() => handlePress(id)} style={{marginLeft: 10, padding: 0, width: gridView ? "46%" : "95%",}}>
      <View
        style={{
            width: "100%",
            borderWidth: 1,
            padding: 15,
            borderRadius: 8,
            borderColor: "#d3d3d3",
            backgroundColor: color,
            alignSelf: 'center',
            height: gridView ? 180 : "auto"
        }}
      >
        {title && title != "" && (
          <Text
            style={{
              fontFamily: "My_Font",
              fontWeight: "700",
              fontSize: 18,
              marginBottom: 10,
            }}
          >
            {title}
          </Text>
        )}
        {description && description != "" && (
          <Text
            style={{ fontFamily: "My_Font", fontSize: 17, color: "#636363" }}
          >
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity> 
  );
};

export default Item;

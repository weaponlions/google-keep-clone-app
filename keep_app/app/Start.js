import React, { useRef, useEffect } from "react"; 
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Button
} from "react-native";
import Icon from "../assets/img/main.png";

const Start = ({ navigation }) => {
    const fadeA = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        handleOn()
      new Promise((res, rej) => {
        setTimeout(()=>{
            navigation.navigate("home");
        }, 3000)
      })
     
    }, [])
    


  const handleOn = () => {
    Animated.timing(fadeA, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
    }).start()
  } 

  return (
    <View>
      <View style={styles.main}>
        <Animated.View style={{opacity: fadeA, width: 100, height: 100}}> 
            <Image source={Icon} style={styles.icon} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    backgroundColor: "lightblue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 100,
    height: 100,
    marginTop: -25
  },
  heading: {
    fontSize: 30,
  }
});

export default Start;

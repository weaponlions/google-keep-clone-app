import { View,  SafeAreaView,  Image, StyleSheet, DrawerLayoutAndroid, Text } from "react-native";
import React, { useState, useRef } from "react";
import { AppBar, HStack, IconButton, Avatar, Button, TextInput } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Notes from "./Notes";
import { Color } from "./Color";
import { useSafeAreaInsets  } from 'react-native-safe-area-context';
import DrawerItem from "./DrawerItem";

const Home = ({navigation}) => {
  const insets = useSafeAreaInsets(); 
  const drawer = useRef(null); 

  const [gridView, setGridView] = useState(false);
  const [barShow, setBarShow] = useState(false);
  const [searchValue, setSearchValue] = useState("")
  const [colorValue, setColorValue] = useState("")

  const handleMenu = () => { 
    // drawer.current.openDrawer();
  };
  
  const handleSearch = () => {
    setBarShow((prev) => !prev);
    setColorValue("");
    setSearchValue("");
  };
 
  const handleColorValue = (code) => {
    setColorValue(code);
  }

  const handleStyle = () => {
    setGridView((prev) => !prev);
  };

  const handleProfile = () => {
    console.log("handleProfile");
  };

  const handlePlus = () => {
    navigation.navigate('notepad', {noteId: null})
  }

  const DrawerBox = () => {
    return (
      <DrawerItem drawer={drawer} />
    )
  }
  return (
    <> 
      <SafeAreaView style={{height: '100%', }}> 
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={DrawerBox} 
      >
          <View>
            <AppBar
              leading={(props) => (
                <HStack>
                  <IconButton
                    onPress={handleMenu}
                    icon={(props) => (
                      <Image
                        style={{ width: 30, height: 30 }}
                        source={require("../../assets/img/menu_black.png")}
                      />
                    )}
                  />
                  <Button
                    variant="text"
                    compact
                    onPress={handleSearch}
                    title="Search your notes"
                    color="#d3d3d3"
                    titleStyle={styles.titleStyle}
                    style={styles.title}
                  />
                </HStack>
              )}
              trailing={(props) => (
                <HStack style={{ marginLeft: -80 }}>
                  <IconButton
                    onPress={handleStyle}
                    icon={(props) => (
                      <Image
                        style={{ width: 25, height: 25 }}
                        source={gridView ? require("../../assets/img/switch_off.png") : require("../../assets/img/switch_on.png")}
                      />
                    )}
                  />
                  <IconButton
                    onPress={handleProfile}
                    icon={(props) => (
                      <Avatar
                        icon={(props) => (
                          <Icon color={"#fff"} name="account" {...props} />
                        )}
                        color="fff"
                      />
                    )}
                  />
                </HStack>
              )}
              style={[styles.appbar, {marginTop: insets.top + 5}]}
            />
          </View>  
          {/* <DrawerBox />  */}
          
          {
            !barShow && (<Notes gridView={gridView} colorValue={colorValue} searchValue={searchValue} />)
          }
          {
            barShow && (colorValue == "" && searchValue == "") && (<Color handleColorValue={handleColorValue} />)
          }
          {
            barShow && (colorValue != "" || searchValue != "") && (<Notes gridView={gridView} colorValue={colorValue} searchValue={searchValue} />)
          }
        </DrawerLayoutAndroid>
      </SafeAreaView>
      <IconButton
        style={styles.plusBtn}
        icon={(props) => (
          <Image {...props} style={{width: 50, height: 50}} source={require("../../assets/img/plus.png")} />
        )}
        onPress={handlePlus}
      /> 
    </>
  );
};

const styles = StyleSheet.create({
  appbar: {
    margin: 10,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    padding: 0,
    backgroundColor: "#cfd9df",
    marginHorizontal: 20
  },
  title: {
    width: "75%",
    backgroundColor: "#cfd9df",
    height: 40,
    marginTop: 5,
  },
  titleStyle: {
    marginLeft: -50,
    fontSize: 18,
    textTransform: "none",
    fontFamily: 'My_Font',
    color: "#000"
    
  },
  plusBtn: {
    width: 65,
    height: 65,
    position: "absolute",
    end: 10,
    bottom: 20,
    borderRadius: 50,
    backgroundColor: "#fff",
    elevation: 5
  },
  hideAppbar: {
    backgroundColor: "#fff", 
    position: 'absolute',
    top: -110,
    start: 0,
    end: 0,
    zIndex: 99,
    height: 101, 
  }
});

export default Home;

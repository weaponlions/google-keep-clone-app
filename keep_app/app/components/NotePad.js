import { View, Text, ScrollView, Image, SafeAreaView, StyleSheet, Keyboard, BackHandler, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { AppBar, IconButton, HStack, Button, Avatar, Icon, TextInput, } from "@react-native-material/core";
import { useSelector, useDispatch,  } from "react-redux";
import { addNote, addRecord, updateNote, removeRecord, deleteNote } from "../store/slices"; 
import randomId from '../store/generator';  


const initialState = { title: '', description: '', color: '', id: '' };
const NotePad = ({ route, navigation }) => {
    
    const { noteId } = route.params; 
    const [id, setId] = useState("");

    const [oldSet, setOldSet] = useState(new Set());
    const oldRecord = useSelector((state)=> state.record['id']);
    const notesRecord = useSelector((state)=> state.notes['data']);

    const [data, setData] = useState( initialState );
    const [oldData, setOldData] = useState(data);
    const dispatch = useDispatch();
  
    useEffect(() => {
      // console.log("old", oldRecord);
      setOldSet(new Set(oldRecord));
    }, [oldRecord])

  
    useEffect(()=> { // get Id when new note create 
        async function getNew () {
            if (noteId == "" && id == "") { 
                let id = await randomId(); 
                setId(id);
            }
            else if(noteId != ""){
              setId(noteId);
              notesRecord.forEach(e => { // set old note data in data state
                if (e.id == noteId) { 
                  setData(e)
                  return 
                }
              }); 
            }
        }
        getNew();
    }, [])

    
    useEffect(() => { 
      const keybord = Keyboard.addListener('keyboardDidHide', async ()=>{
        if (oldData.title != data.title || oldData.description != data.description) {
          if (oldSet.has(id) || oldSet.has(noteId)) {
            dispatch(updateNote({...data, id})); 
          }
          else{
            dispatch(addRecord(id))
            dispatch(addNote({...data, id}));
          } 
        }
      }) 
      return () => {
          keybord.remove()
      } 
    }, [data]);
 
    
    useEffect(() => { 
      // console.log("NA",data);
      const back = navigation.addListener('beforeRemove', (e) => {
        handleBlur()
      }) 
      return back;
    }, [navigation, data])


    const handleBlur = async () => { // focusOut in TextInput  
      if (data.title != oldData.title || data.description != oldData.description) {  
        if (oldSet.has(id) && data.title == "" && data.description == "") {
          dispatch(removeRecord(id))
          dispatch(deleteNote(id)); 
        }
        else if(oldSet.has(id)) {
          dispatch(updateNote({...data, id}));
        }
        else{
          dispatch(addRecord(id))
          dispatch(addNote({...data, id}));
        } 
      }
    }
     
    
    const handleFocus = async () => { // focusIn in TextInput 
      setOldData({...data})  
    }
 
     
    return (
    <>
      <SafeAreaView style={{backgroundColor: '#fff'}} >
        {/* <ScrollView keyboardShouldPersistTaps='always' style={{backgroundColor: '#fff', padding: 10 }}> */}

            <TextInput variant="text" value={data.title} onFocus={handleFocus} onBlur={handleBlur} onChangeText={(e)=> setData({...data, title: e})} placeholder="Title" multiline style={styles.textTitle} keyboardType="url" />  

            <TextInput variant="text" value={data.description} onFocus={handleFocus} onBlur={handleBlur} onChangeText={(e)=> setData({...data, description: e})} placeholder="Note" multiline inputStyle={styles.textNote} /> 
             
        {/* </ScrollView> */}
      </SafeAreaView>
      <AppBar
        variant="bottom"
        leading={(props) => (
          <View>
            <IconButton
              icon={(props) => (
                <Image
                  {...props}
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/img/box_plus.png")}
                />
              )}
            />
          </View>
        )}
        trailing={(props) => (
          <View>
            <IconButton
              icon={(props) => (
                <Image
                  {...props}
                  style={{ width: 30, height: 30 }}
                  source={require("../../assets/img/blk_dots.png")}
                />
              )}
            />
          </View>
        )}
        style={styles.appBar}
      />
    </>
  );
};

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: "#fff",
    position: "absolute",
    start: 0,
    bottom: 0,
    end: 0,
  },
  textNote:{ 
    fontFamily: 'My_Font', 
    // marginTop: 15, 
    // fontSize: 18
  },
  textTitle:{
    fontSize: 18, 
    fontFamily: 'My_Font',
    marginTop: 15, 
  }
});

export default NotePad;

import { View, Text, ScrollView, FlatList, RefreshControl  } from 'react-native';
import StaggeredList from '@mindinventory/react-native-stagger-view';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'; 
import { loadNote } from '../store/slices';
import Blank from './Blank';
import Item from './Item'; 


const Notes = ({ gridView, searchValue, colorValue }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const NotesValue = useSelector((state)=> state.notes['data']) 
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([])

    useEffect(()=>{
        if (colorValue != "") 
        {
            
        }
        else if(searchValue != "")
        {

        }
        else{
            setData(NotesValue)
        }
    }, [colorValue, searchValue, NotesValue])

    // console.log(NotesValue.length);

    const onRefresh = useCallback(() => {
        // console.log('refreash')
        setRefreshing(true);
        dispatch(loadNote())
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);
 
    
    return (
        <>
            {data.length == 0 ? (
                <View style={{ height: '80%', width: '100%', }}>
                    <Blank />
                </View>
            ) : (
                <View style={{ padding: 0, flex: 1, paddingTop: 5, marginBottom: 0, width: "100%", justifyContent: 'center',}} >
                    
                    <StaggeredList
                            data={data}
                            animationType={'NONE'} 
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <Item 
                                    title={item.title} 
                                    description={item.description} 
                                    id={item.id} 
                                    color={item.color}
                                    navigation={navigation}
                                    gridView={gridView}
                                />
                            )} 
                            refreshing={refreshing}
                            onRefresh={onRefresh} 
                            numColumns={gridView ? 2 : 1}
                            keyPrefix='item_' 
                        />
                </View> 
            )}
        </>
    )
}

export default Notes;
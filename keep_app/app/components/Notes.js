import { View, Text, ScrollView, FlatList, RefreshControl  } from 'react-native';
import { VStack, HStack } from '@react-native-material/core';
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
    }, [colorValue, searchValue])

    const onRefresh = useCallback(() => {
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
                    <FlatList 
                        data={data} 
                        numColumns={gridView ? 2 : 1}
                        key={gridView ? 2 : 1}
                        renderItem={({ item }) => (
                            <Item 
                                title={
                                    gridView ? 
                                    (item.title && item.title.length > 15 ? `${item.title.substring(0, 15)}...` : item.title)
                                    :
                                    (item.title && item.title.length > 25 ? `${item.title.substring(0, 25)}...` : item.title)
                                } 
                                description={
                                    gridView ? 
                                    (item.description && item.description.length > 70 ? `${item.description.substring(0, 70)}...` : item.description)
                                    :
                                    (item.description && item.description.length > 130 ? `${item.description.substring(0, 130)}...` : item.description)
                                } 
                                id={item.id} 
                                color={item.color}
                                navigation={navigation}
                                gridView={gridView}
                            />
                        )}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        onEndReached={()=> console.log('fsdfv')}
                        contentContainerStyle={{  
                            gap: 10,
                        }}  
                        style={{ borderWidth: 0, }} 
                    />  
                </View> 
            )}
        </>
    )
}

export default Notes;
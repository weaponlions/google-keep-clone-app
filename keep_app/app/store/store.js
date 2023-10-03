import { configureStore,  } from "@reduxjs/toolkit";
import { rootReducers } from "./slices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore, } from "redux-persist";
 

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, 
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
    reducer:  persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        serializableCheck: false,
        }),
});

const persistedStore = persistStore(store);

export { store, persistedStore};


// middleware: getDefaultMiddleware({
    //     serializableCheck: {
    //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    // })

    // FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, 
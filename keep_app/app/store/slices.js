import { createSlice, combineReducers } from '@reduxjs/toolkit';
 
 
const recordSlice = createSlice({
    name: 'record',
    initialState: {id: []},
    reducers: {
        addRecord(state, {type, payload}) { 
            state.id.push(payload) 
            // return {id: []}
        },

        removeRecord(state, {type, payload}) {
            let arr = state.id;
            let check = false;
            if (arr[arr.length - 1] == payload) {
                arr.pop();
            }
            else{
                for (let i = 0; i < arr.length; i++) 
                {
                    if (arr[i] == payload) {
                         check = true;
                    }

                    if (check && i < arr.length - 1) {
                        arr[i] = arr[i+1];
                    }

                }
                arr.pop();
            } 
            
        },
    },
     
})
  

const notesSlice = createSlice({
    name: 'notes',
    initialState: {data: []},
    reducers: {
        addNote(state, {type, payload}) {
            state.data.push(payload);
            // return {data: []}
        },
        loadNote(state, action) {
            return state
        },
        deleteNote(state, {type, payload}) {
            let check = false;
            let arr = state.data;
            if (arr[arr.length - 1].id == payload) {
                arr.pop();
            }
            else{
                for (let i = 0; i < arr.length; i++) {
                    let obj = arr[i];
                    if (obj.id == payload) {
                        check = true;
                    }
                    if (check && i < arr.length - 1) {
                        arr[i] = arr[i+1];
                    }
                }
                arr.pop();
            }
        },
        updateNote(state, {type, payload}) {
            let index = 0;
            state.data.forEach((e, i) => { 
                if (e.id == payload.id) {
                    index = i;
                    return 
                } 
            })
            state.data[index] = payload;
        }
    },
});

export const rootReducers = combineReducers({notes: notesSlice.reducer, record: recordSlice.reducer}) ;
export const { addNote, loadNote, deleteNote, updateNote } = notesSlice.actions;
export const { addRecord, removeRecord, checkRecord } = recordSlice.actions;


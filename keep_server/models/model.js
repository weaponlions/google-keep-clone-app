import { Schema, model } from "mongoose";


const note_Schema = new Schema({
    title: {
        type: String,
        required: false
    },
    description: {
      type: String,
      required: false
    },
    color: {
        type: String,
        required: true,
        default: "white"
    },
    pinned: {
        type: Boolean,
        required: true,
        default: false
    },
    id: {
        type: String,
        unique: true, 
        required: true
    },
    archive: {
        type: Boolean,
        required: true,
        default: false
    },
    deleted: {
        type: Boolean,
        required: true,
        default: false
    },
    image:{
        type: String,
    }
}, {timestamps: true});


const noteModel = model("NOTES", note_Schema);

export default noteModel;

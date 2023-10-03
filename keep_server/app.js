import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import noteModel from "./models/model.js";
import router from "./routes/route.js";
import fileUpload from "express-fileupload";

const app = express()

app.use(bodyParser.json({limit: '10mb',}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
app.use(express.static('/static'))
app.use(fileUpload())

// const doc = ['user1', 'user2', 'user3']

// app.get('/event', (req, res) => {
//     const headers = {
//         'Content-Type': 'text/event-stream',
//         'Connection': 'keep-alive',
//         'Cache-Control': 'no-cache'
//       };
//       res.writeHead(200, headers);
    
//       console.log('Start', req.query);
//       const data = `data: ${JSON.stringify({mes: "joker koi"})}\n\n`; 
//       const { user } = req.query
//       const inter = setInterval(()=>{
//         let bool = false
//         doc.forEach((e)=>{
//             if (e == user) {
//                 bool = true
//                 return
//             }
//         })
//         if (bool) {
//             res.write(data); 
//         } 
//       }, 2000)
    
//       req.on('close', () => {
//         console.log(`Connection closed`); 
//         clearInterval(inter)
//       });
// })

app.use(router);

const url = "mongodb://localhost:27017";
const port = 9000;
const options = {
    dbName: 'GOOGLE_KEEP', 
}

mongoose.connect(url, options).then((e) => {
    app.listen(port, ()=> {
        console.log(`http://localhost:${port}`);
    })
})
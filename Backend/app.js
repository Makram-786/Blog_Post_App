const express = require('express');
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const postRoutes = require('./routes/feed')

const app = express();

app.use('/images',express.static(path.join(__dirname,'images')))

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'images')
    },
    filename:(req,file,cb)=>{
        cb(null , file.originalname)
    }
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ){
        cb(null, true)
    }else{
        cb(null,false)
    }

}
app.use(cors())
app.use(express.json())
// app.use(express.static(path.join(__dirname , 'images')))
app.use(multer({storage:fileStorage , fileFilter:fileFilter}).single('image'))
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

app.use('/feed',postRoutes)

app.use((error,req,res,next)=>{
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message:message
    })
})

mongoose.connect('mongodb+srv://mubashar_akram_nodejs_2024:Xpmbv8TebYQkVZyD@cluster0.7d9ibiq.mongodb.net/post')
.then(result=> app.listen(8080)).catch(err=> console.log(err))


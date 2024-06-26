const {validationResult} = require('express-validator')

const Post = require('../models/post')
exports.getPosts = (req,res,next)=>{
    Post.find().then(posts=>{
        res.status(200).json({
            message:"Fetch All Posts Successfully",
            posts:posts
        })
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
}

exports.createPost = (req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation error, entered data is incorrect')
        error.statusCode = 422;
        throw error;
    }
        if(!req.file){
            const error = new Error('No image provided');
            error.statusCode = 422;
           throw error
        }
        const title = req.body.title;
        const content = req.body.content;
        const imgUrl = `images/${req.file.filename}`;
        const post = new Post({
            title:title,
            imgUrl:imgUrl,
            content:content,
            creator:{
                name:"Mubashar"
            },
        })
        post.save().then(result=>{
            console.log(result);
            res.status(201).json(
               { message: "New Post Created Successfully!",
                post:result
            }
        
            )
        }).catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err)
        })
    }


exports.getPost = (req,res,next)=>{
    const postId = req.params.postId;
    Post.findById(postId).then(post=>{
        if(!post){
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err)
        }
        else{
            res.status(200).json({
                message:"Fetch Post Successfully",
                post:post
            })
        }
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
}


exports.editPost = (req,res,next)=>{
    const postId = req.params.postId;
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    const updateImage = req.file.path;
    Post.findByIdAndUpdate(postId).then(post=>{
        if(!post){
            const error = new Error('no post found related to this Id');
            error.statusCode = 422;
            return  next(error);
        }
        post.title = updatedTitle;
        post.content= updatedContent;
        post.imgUrl = updateImage;
        post.save();
       return res.status(200).json({message: "Post has been updated successfully!", post:post})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    })
}
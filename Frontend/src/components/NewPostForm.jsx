import {useState,useEffect} from 'react'
import {useParams,useSearchParams,useNavigate} from 'react-router-dom'
const NewPostForm = () => {
  const [newPost, setNewPost] = useState({
    title:"",
    content:""
  })
  const [image,setImage] = useState(null);
  const [preview, setPreview] = useState(null)
  const {title,content} = newPost;
  const {id} = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
 const isEditing = searchParams.get('editing')
  // console.log("isEditing================================", isEditing)
  useEffect(()=>{
      if(isEditing){
        fetch(`http://localhost:8080/feed/post/${id}`)
        .then(res=> res.json())
        .then(postData=> {
          console.log(postData)
          const{post} = postData;
          setNewPost({
            title:post.title,
            content:post.content
          })
          setPreview(`http://localhost:8080/${post.imgUrl}`);
        }).catch(err=> console.log(err))

      }
  },[isEditing])
  const changeHandler = (e) =>{
    setNewPost({...newPost,
    [e.target.name]: e.target.value})
  }
  const fileHandler = (e) =>{
    const file = e.target.files[0]
    if(file){
      setImage(file)
      const fileReader = new FileReader();
      fileReader.onloadend=()=>{
        setPreview(fileReader.result)
      }
      fileReader.readAsDataURL(file)
    }
  }
    const handleSubmit = (e) =>{
      e.preventDefault();
      const newPost = new FormData();
      newPost.append('title',title)
      newPost.append('image',image)
      newPost.append('content',content)
      if(!isEditing){
        console.log("=============================New Post",newPost)
        fetch('http://localhost:8080/feed/post', {
          method: 'POST',
          body: newPost
        }).then(res=> res.json()).then(post=> navigate('/')).catch(err=>console.log(err))

      }else{
        fetch(`http://localhost:8080/feed/post/${id}`,{
          method:'PUT',
          body: newPost
        }).then((post)=>
         {console.log("Post Has been Updated Successfully",post)
           navigate('/')
      }).catch(err=> console.log(err))
      }

    }
  return (
    <div className="new-blog-post">
      <div className="container">
    <form onSubmit={handleSubmit}>
        <div className="form-group mb-10">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={title} onChange={changeHandler} />
        </div>
        <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input type="file" name="image" id="image" multiple accept='image/*'  onChange={fileHandler} />
        </div>
          <div className="form-group">
         {/* { !isEditing ? <img src={preview} alt={title} /> :  <img src={`http://localhost:8080/${image}`} alt={title} />} */}
         <div className="image-preview">
           <img src={preview} alt={title} /> 
         </div>
        </div>
      
        <div className="form-group mb-10">
            <label htmlFor="content">Description</label>
          <textarea name="content" id="content" cols="30" rows="10" value={content} onChange={changeHandler}></textarea>
        </div>
        <div className="flex-end d-flex">
        <button type='submit' className='add-post-btn'>Add Post</button>
        </div>
    </form>
      </div>
    </div>
  )
}

export default NewPostForm
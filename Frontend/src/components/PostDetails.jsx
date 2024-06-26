import { useEffect,useState } from 'react';
import {useParams,useNavigate} from 'react-router-dom'

const PostDetails = () => {
    const navigate = useNavigate();
    const[post,setPost] = useState({
        title:"",
        content:"",
        imgUrl:null
    })
    const {id} = useParams();
    useEffect(()=>{
        fetch('http://localhost:8080/feed/post/'+id).then(res=> res.json()).then(post=> {
            const postData = post.post;
            setPost(postData)
            console.log(postData)
        })
    },[])
    return (
        <>
        <button className='my-10 blue-color' onClick={()=> navigate('/')}>Back to post list</button>
    <div className='container'>
        <h2>{post.title}</h2>
        <img src={`http://localhost:8080/${post.imgUrl}`} alt={post.title} />
        <p>{post.content}</p>
    </div>
        
        </>
  )
}

export default PostDetails
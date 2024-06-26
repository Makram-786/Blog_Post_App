import SinglePost from "../components/SinglePost"
import { useState,useEffect } from "react"
import Spinner from "../components/Spinner"
// const posts= [
// 	{
// 		id:new Date().toISOString(),
// 		title:"Post one",
// description:"this is post one"},
// {
// 	id:new Date().toISOString(),
// 	title:"Post two",
// description:"this is post two"},
// {
// 	id:new Date().toISOString(),
// 	title:"Post three",
// description:"this is post three"},
// ]

const Feed = () =>{
	// const [postData,setPostData] = useState([{
	// 	title:"",
	// 	content:"",
	// 	imgUrl:""
	// }]);
	const [postData,setPostData] = useState([])
	useEffect(()=>{
			fetch('http://localhost:8080/feed/posts')
			.then(res=> res.json())
			.then(posts=>{
					const message = posts.message;
					const post = posts.posts
				 setPostData(post)
			}
				
				)
			.catch(err=> {console.log(err)
				setPostData([]); 
			})
	},[])
	 
	if(postData.length == 0){
		return <Spinner/>
	}else{
		return (
			<main>
			<div className="container">
				
				{ postData.map(post=>(
					<SinglePost key={post._id} post={post} />
				))} 
			</div>
			</main>
		)
	}
}
export default Feed
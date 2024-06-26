import { Link } from "react-router-dom"

const SinglePost = ({post: {title, content, imgUrl,_id}}) =>{
	// const fullImgUrl = `http://localhost:8080${imgUrl}`;
	//  title= "Testing...";
	return( 
		<>
		<div className="blog-post">
		<h2 className="mb-10">{title}</h2>
		<img src={`http://localhost:8080/${imgUrl}`} alt={title} />
		<p className="mb-10">{content}</p>
		<Link to={`/post/post-details/${_id}`}>View</Link>
		<Link to={`/post/edit-post/${_id}?editing='true'`}>Edit</Link>
		<button>Delete</button>
		</div>
		</>
		)
}

export default SinglePost
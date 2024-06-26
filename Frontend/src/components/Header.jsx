import { Link } from "react-router-dom"

const Header = () => {
  return (
    <nav className="main-header">
        <h1>
           <Link to={'/'}> BLOGGING</Link>
        </h1>
        <Link className="add-post-btn" to={'/post/new-post'}>Add New Post</Link>
    </nav>
  )
}

export default Header
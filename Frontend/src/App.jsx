import Header from './components/Header'
import NewPostForm from './components/NewPostForm'
import PageNotFound from './components/PageNotFound'
import PostDetails from './components/PostDetails'
import Feed from './pages/Feed'
import {Routes, Route} from 'react-router-dom'
// import 'dotenv/config'
function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Feed/>}/>
      <Route path='/post/new-post' element={ <NewPostForm/>} />
      <Route path='/post/edit-post/:id' element={ <NewPostForm/>} />
      <Route path='/post/post-details/:id' element={<PostDetails/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </>
  )
}

export default App

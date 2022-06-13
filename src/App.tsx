
import './App.css';
import Posts from './features/posts/Posts';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewPost from './features/posts/ViewPost';
import NewPost from './features/posts/NewPost';
import Login from './features/auth/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <BrowserRouter>
          <Routes>
            <Route path="/" >
              <Route index element={<Posts />}/>
              <Route path='login' element={<Login />}/>
              <Route path=":postId" element={<ViewPost />} />
              <Route path="new" element={<NewPost />} />
            </Route>
          </Routes>
        </BrowserRouter>
        
      </header>
    </div>
  );
}

export default App;

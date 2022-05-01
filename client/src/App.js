import { Route, Routes } from "react-router-dom";
import Quiz from "./component/CreateQuiz/Quiz";
import ShowQuiz from './component/ShowQuiz/ShowQuiz'
import 'bootstrap/dist/css/bootstrap.css'
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import CreatePost from "./component/Post/CreatePost";
import ShowPost from "./component/Post/ShowPost";
import EditPost from "./component/Post/EditPost";
import UserProfile from "./component/User/UserProfile";
import UpdateUser from './component/User/UpdateUser';
import Home from "./component/Home/Home";
import SearchPost from "./component/Search/SearchPost";
import SearchUser from "./component/Search/SearchUser";
import SearchQuiz from "./component/Search/SearchQuiz";
import Entry from "./component/Entry/Entry";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/create'>
          <Route exact path='quiz' element={<Quiz />} />
          <Route exact path='user' element={<Signup />} />
          <Route exact path='post' element={<CreatePost />} />
        </Route>
        <Route exact path='/show'>
          <Route exact path='quiz/:id' element={<ShowQuiz />} />
          <Route exact path='post/:id' element={<ShowPost />} />
          <Route exact path='user/:id' element={<UserProfile />} />
        </Route>
        <Route exact path='/edit'>
          <Route exact path='post/:id' element={<EditPost />} />
          <Route exact path='user' element={<UpdateUser />} />
        </Route>
        <Route exact path='/search'>
          <Route exact path='post' element={<SearchPost />} />
          <Route exact path='user' element={<SearchUser />} />
          <Route exact path='quiz' element={<SearchQuiz />} />
        </Route>
        <Route exact path='/entry' element={<Entry />} />
      </Routes>
    </>
  );
}

export default App;

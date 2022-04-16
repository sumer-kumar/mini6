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

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<h1>Home</h1>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path = '/create'>
        <Route exact path = 'quiz' element = {<Quiz/>} />
        <Route exact path = 'user' element = {<Signup/>}/>
        <Route exact path = 'post' element = {<CreatePost/>}/>
      </Route>
      <Route exact path = '/show'>
        <Route exact path = 'quiz/:id' element = {<ShowQuiz/>}/>
        <Route exact path = 'post/:id' element = {<ShowPost/>}/>
        <Route exact path = 'user/:id' element = {<UserProfile/>}/>
      </Route>
      <Route exact path = '/edit'>
        <Route exact path = 'post/:id' element = {<EditPost/>}/>
        <Route exact path = 'user' element = {<UpdateUser/>}/>
      </Route>
    </Routes>
    );
}

export default App;

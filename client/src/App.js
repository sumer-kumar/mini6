import { Route, Routes } from "react-router-dom";
import Quiz from "./component/CreateQuiz/Quiz";
import ShowQuiz from './component/ShowQuiz/ShowQuiz'
import 'bootstrap/dist/css/bootstrap.css'
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<h1>Home</h1>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path = '/create'>
        <Route exact path = 'quiz' element = {<Quiz/>} />
      </Route>
      <Route exact path = '/show'>
        <Route exact path = 'quiz' element = {<ShowQuiz/>}/>
      </Route>
    </Routes>
    );
}

export default App;

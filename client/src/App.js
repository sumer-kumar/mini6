import { Route, Routes } from "react-router-dom";
import Quiz from "./component/CreateQuiz/Quiz";
import ShowQuiz from './component/ShowQuiz/ShowQuiz'
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<h1>Home</h1>}/>
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

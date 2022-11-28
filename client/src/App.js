import { Route, Routes} from 'react-router-dom';
import './App.css';
import Landing from './components/landing/landingPage.jsx';
import Home from './components/home/home';
import Details from './components/details/details';
import CreateGame from './components/newGame/createGame';

function App() {
  return (
  <Routes>
      <Route exact path="/" element ={<Landing/>}></Route>
      <Route exact path="/home" element ={<Home/>}></Route>
      <Route exact path="/videogame/:id" element ={<Details/>}></Route>
      <Route exact path="/new" element ={<CreateGame/>}></Route>
  </Routes>
  );
}

export default App;

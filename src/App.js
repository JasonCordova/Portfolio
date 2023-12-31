import Header from './Components/Header.js';
import Home from './Home.js';
import {Routes, Route} from 'react-router-dom';
import Project from './Project.js';

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/:id" element={<Project/>}/>
      </Routes>
    </>
  );
}

export default App;

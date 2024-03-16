import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import TestPage from "./pages/TestPage";

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element ={<TestPage/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;

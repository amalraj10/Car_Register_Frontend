import { Route, Routes } from 'react-router-dom';
import './App.css';
import Register from './Pages/Register';
import Details from './Pages/Details';

function App() {
  return (
    <div >
       <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/details' element={<Details/>}/>
</Routes>
    </div>
  );
}

export default App;

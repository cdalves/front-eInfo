import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Sigin from './components/Sigin/Sigin';
import Login from './components/Login/Login';
import { UserStorage } from './UserContext';
import EventosPage from './components/EventosPage';
import CamFace from './components/IA/CamFace';


function App() {
 return (
    <div>
        <BrowserRouter>
            <UserStorage>
            <Header/>
            <Routes>
                <Route path='/*' element={<Home/>}/>
                <Route path='/evento/:id' element={<EventosPage/>}/>
                <Route path='/cadastro' element={<Sigin/>}/>
                <Route path='/entrar/*' element={<Login/>}/>
                <Route path='/face' element={<CamFace/>}/>

            </Routes>
            <Footer/>
            </UserStorage>
        </BrowserRouter>

    </div>
 )
}

export default App;

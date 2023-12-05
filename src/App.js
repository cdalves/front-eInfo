import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Sign from './components/Sign/Sign';
import Login from './components/Login/Login';
import { UserStorage } from './UserContext';
import EventosPage from './components/EventosPage';
import PageUser from './components/Login/PageUser';
import CreatEventos from './components/CreatEventos';
import Formulario from './components/Forms/Formulario';
import RespostaIA from './components/Forms/RespostaIA';
import CamFace from './components/IA/CamFace'
import EditPage from './components/EditPage';
import AddFAce from './components/IA/AddFAce';


function App() {
 return (
    <div>
        <BrowserRouter>
            <UserStorage>
            <Header/>
            <Routes>
                <Route path='/*' element={<Home/>}/>
                <Route path='/evento/:id' element={<EventosPage/>}/>
                <Route path='/cadastro' element={<Sign/>}/>
                <Route path='/entrar/*' element={<Login/>}/>
                <Route path='/conta/*' element={<PageUser/>}/>
                <Route path='/conta/evento/:id' element={<EventosPage/>}/>
                <Route path='/criar-evento' element={<CreatEventos/>}/>
                <Route path='/evento/:id/formulario' element={<Formulario/>}/>
                <Route path='/evento/:id/formulario/' element={<Formulario/>}/>
                <Route path='/evento/:id/analisar/' element={<RespostaIA/>}/>
                <Route path='/evento/:id/facial/' element={<CamFace/>}/>
                <Route path='/evento/:id/editar/' element={<EditPage/>}/>
                <Route path='/conta/evento/:id/formulario/' element={<Formulario/>}/>
                <Route path='/conta/evento/:id/analisar/' element={<RespostaIA/>}/>
                <Route path='/conta/evento/:id/facial/' element={<CamFace/>}/>
                <Route path='/conta/evento/:id/editar/' element={<EditPage/>}/>
                <Route path='/addFace' element={<AddFAce/>}/>

            </Routes>
            <Footer/>
            </UserStorage>
        </BrowserRouter>

    </div>
 )
}

export default App;

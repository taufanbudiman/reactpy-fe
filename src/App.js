import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home'
import Create from './pages/Create'
import Layout from "./Layout";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageDetail from "./pages/Details";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="form" element={<Create/>} />
                    <Route path="form/:id" element={<Create/>} />
                    <Route path="detail/:id" element={<PageDetail />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

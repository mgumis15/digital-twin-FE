import { Map2D } from './pages/Maps/map2D/map2D.page';
import { Store } from './pages/store/store.page';
import { Logs } from './pages/logs/logs.page';
import { Home } from './pages/home/home.page';
import { Navbar } from './components/Navbar.component';
import { PageNotFound } from './pages/error/pageNotFound.page';
import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <>
    <div className="App dark">
    <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/map' element={<Map2D/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path='/logs' element={<Logs/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    </div>
    </>
  );
}

export default App;

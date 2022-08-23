import { Map2D } from './pages/Maps/map2D/map2D.page';
import { StorePage } from './pages/store/StorePage.page';
import { LogsPage } from './pages/logs/LogsPage.page';
import { HomePage } from './pages/home/HomePage.page';
import { Navbar } from './components/Navbar.component';
import { PageNotFound } from './pages/error/pageNotFound.page';
import { Routes,Route } from 'react-router-dom';
function App() {
  return (
    <>
    <div className="App dark">
    <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/map' element={<Map2D/>}/>
          <Route path='/store' element={<StorePage/>}/>
          <Route path='/logs' element={<LogsPage/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    </div>
    </>
  );
}

export default App;

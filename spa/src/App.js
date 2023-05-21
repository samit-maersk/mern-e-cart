import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <article className="d-flex p-2">
        <Outlet />
      </article>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

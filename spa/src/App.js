import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer />
        <hr/>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

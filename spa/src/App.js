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
      <article className='m-5'>
        <Outlet />
      </article>
      <footer className='m-10'>
        <ToastContainer />
        
        <Footer />
      </footer>
    </div>
  );
}

export default App;

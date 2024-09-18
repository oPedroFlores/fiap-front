import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import { UserStorage } from './contexts/UserContext';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <UserStorage>
      <div className="App">
        <NavBar></NavBar>
        <Outlet />
        <Footer></Footer>
      </div>
    </UserStorage>
  );
}

export default App;

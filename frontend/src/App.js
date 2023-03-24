import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" caseSensitive={true} element={<Login />} />
        <Route path="/Register" caseSensitive={true} element={<Register />} />
        <Route path="/Dashboard" caseSensitive={true} element={<><Navbar/><Dashboard /></>} />
      </Routes>
    </Router>

  );
}

export default App;

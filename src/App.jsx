import './styles/App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Details from './components/Details';

function App() {
  return (
    <>
      <Routes>

        <Route path="Home" element={<Home />} />
        <Route path="Details/:stock" element={<Details />} />

        <Route path="/" element={<Navigate to="/Home" />} />
      </Routes>
    </>
  );
}

export default App;

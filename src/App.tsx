import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { defaultConfiguration } from './configurations/defaultConfiguration';
import { Playmodoro } from './pages/Playmodoro/Playmodoro';

import './App.css';
import "./assets/scss/main.scss";

// import { Help } from './pages/Help/Help';
// import logo from './logo.svg';

import { PlaymodoroProvider } from './contexts/playmodoro';


function App() {
  const configuration = defaultConfiguration;

  return (
    <PlaymodoroProvider
      configuration={configuration}
    >
      <div className="App">

        <Router>
          <Routes>
            <Route path="/" element={<Playmodoro/>} />
            {/* <Route path="/help" element={<Help />} /> */}
          </Routes>
        </Router>
    </div>
    </PlaymodoroProvider>
  );
}

export default App;

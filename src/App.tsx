import { Playmodoro } from './components/Playmodoro/Playmodoro';
import { Storage } from './utils/storage';


import { defaultConfiguration } from './configurations/defaultConfiguration';

// import { fetchVideoInfo } from '../../utils/youtube';

import logo from './logo.svg';
import './App.css';
import "./assets/scss/main.scss";


import { PlaymodoroProvider } from './contexts/playmodoro';


function App() {
  const configuration = defaultConfiguration;

  return (
    <PlaymodoroProvider
      configuration={configuration}
    >
    <div className="App">
      <Playmodoro
      />

    </div>
    </PlaymodoroProvider>
  );
}

export default App;

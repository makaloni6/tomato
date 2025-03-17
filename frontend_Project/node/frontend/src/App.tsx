import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Timer from './Timer';
import Header from '@/components/Header';
import './App.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [restTimer, setRestTimer] = useState(0);
  return (
    <>
      <div className="app-container">

        <Header timer={timer} setTimer={setTimer} restTimer={restTimer} setRestTimer={setRestTimer} isRunning={isRunning}/>
        <div className={`timer-wrapper ${isRunning ? 'working' : 'resting'} min-h-screen` }>
          <Timer timer={timer} setTimer={setTimer} restTimer={restTimer} setRestTimer={setRestTimer} isRunning={isRunning} setIsRunning={setIsRunning} />
        </div>
          
      </div>
    </>
  );
}

export default App

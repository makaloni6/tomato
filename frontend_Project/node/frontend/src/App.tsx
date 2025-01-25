import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Timer from './Timer';
import Header from '@/components/Header';
import './App.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  return (
    <div>
      <Header isRunning={isRunning}/>
      <div className='App'>
        <Timer isRunning={isRunning} setIsRunning={setIsRunning} />
      </div>
    </div>
  );
}

export default App

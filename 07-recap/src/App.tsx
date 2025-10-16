import { useState } from 'react';
import './App.css';
import LightBulb from './components/LightBulb';
import Toggle from './components/Toggle';
import GrandMotherComponent from './components/GrandMotherComponent';

function App() {
  const [isOn, setIsOn] = useState(false);
  return (
    <>
      <h1>Recap</h1>
      <div className='flex'>
        <LightBulb isOn={isOn} />
        {/* <GrandMotherComponent isOn={isOn} /> */}
        <Toggle label='click here' name='clicked' setIsOn={setIsOn} />
      </div>
    </>
  );
}

export default App;

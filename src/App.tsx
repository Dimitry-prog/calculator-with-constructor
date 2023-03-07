import React from 'react';
import Switcher from './components/Switcher';
import Eye from './icons/Eye';
import Canvas from './components/Canvas';

const App = () => {
  return (
    <div>
      <Switcher isConstructor={true} isRunning={false} />
      <Canvas isOpen={true} />
    </div>
  );
};

export default App;

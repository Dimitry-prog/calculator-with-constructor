import React from 'react';
import Switcher from './components/Switcher';
import Canvas from './components/Canvas';
import Constructor from './components/Constructor';

const App = () => {
  return (
    <div>
      <Switcher isConstructor={true} isRunning={false} />
      <Constructor isOpen={true} />
      <Canvas isOpen={true} />
    </div>
  );
};

export default App;

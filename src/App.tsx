import React from 'react';
import Switcher from './components/Switcher';
import Eye from './icons/Eye';

const App = () => {
  return (
    <div>
      <Switcher isConstructor={true} isRunning={false} />
    </div>
  );
};

export default App;

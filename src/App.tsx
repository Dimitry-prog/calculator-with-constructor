import React from 'react';
import Switcher from './components/Switcher';
import Canvas from './components/Canvas';
import Constructor from './components/Constructor';

const App = () => {
  return (
    <div className="max-w-[695px] w-full px-20 mx-auto flex flex-col ">
      <header className="py-10 flex justify-end">
        <Switcher isConstructor={true} isRunning={false} />
      </header>

      <main className="flex gap-14">
        <Constructor isOpen={true} />
        <Canvas isOpen={true} />
      </main>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import Switcher from './components/Switcher';
import Canvas from './components/Canvas';
import Constructor from './components/Constructor';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { IDragOrder } from './types/models';
import { dragOrder } from './utils/constants';

const App = () => {
  const [fields, setFields] = useState<IDragOrder[]>(dragOrder);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // if (!destination) return;
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="max-w-[695px] w-full px-20 mx-auto flex flex-col ">
        <header className="py-10 flex justify-end">
          <Switcher isConstructor={true} isRunning={false} />
        </header>

        <main className="flex gap-14">
          <Constructor isOpen={true} fields={fields} setFields={setFields} />
          <Canvas isOpen={true} />
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;

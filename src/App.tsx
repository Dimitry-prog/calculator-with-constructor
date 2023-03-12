import React, { FC, useState } from 'react';
import Switcher from './components/Switcher';
import Canvas from './components/Canvas';
import Constructor from './components/Constructor';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { IDragOrder } from './types/models';
import { dragOrder } from './utils/constants';
import { useAppSelector } from './hooks/useTypedSelector';

const App: FC = () => {
  const { isRunning } = useAppSelector((state) => state.calc);
  const [constructorFields, setConstructorFields] = useState<IDragOrder[]>(dragOrder);
  const [runningFields, setRunningFields] = useState<IDragOrder[]>([]);

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    let elem;
    const constructor = constructorFields;
    const running = runningFields;

    if (source.droppableId === 'constructor') {
      elem = constructor[source.index];
      constructor.splice(source.index, 1);
    } else {
      elem = running[source.index];
      running.splice(source.index, 1);
    }

    if (destination.droppableId === 'constructor') {
      constructor.splice(destination.index, 0, elem);
    } else {
      running.splice(destination.index, 0, elem);
    }

    setConstructorFields(constructor);
    setRunningFields(running);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="max-w-[695px] w-full px-20 mx-auto flex flex-col ">
        <header className={`py-10 flex ${!isRunning ? 'justify-end' : ''}`}>
          <Switcher />
        </header>

        <main className="flex gap-14">
          {!isRunning && (
            <Constructor
              constructorFields={constructorFields}
              setConstructorFields={setConstructorFields}
            />
          )}
          <Canvas runningFields={runningFields} />
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;

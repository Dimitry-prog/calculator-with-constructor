import React, { FC } from 'react';
import Substrate from './Substrate';
import CalcButton from './UI/CalcButton';
import { calcAction, calcNumAndComma } from '../utils/constants';
import { useAppSelector } from '../hooks/useTypedSelector';
import { IDragOrder } from '../types/models';
import { Draggable, Droppable } from 'react-beautiful-dnd';

type ConstructorProps = {
  setConstructorFields: React.Dispatch<React.SetStateAction<IDragOrder[]>>;
  constructorFields: IDragOrder[];
};

const Constructor: FC<ConstructorProps> = ({ constructorFields }) => {
  return (
    <Droppable droppableId="constructor">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`w-full flex flex-col gap-3 ${
            snapshot.isDraggingOver ? 'opacity-70 bg-gray-200' : ''
          }`}
        >
          {constructorFields.map(({ id, name }, index) => {
            if (name === 'output') {
              return (
                <Draggable draggableId={id} index={index} key={id}>
                  {(provided, snapshot) => (
                    <Substrate
                      draqRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      classes={`${snapshot.isDragging ? 'bg-gray-100' : ''}`}
                    >
                      <div
                        className={`px-2 py-1 w-full text-4xl text-right font-extrabold text-black bg-gray-100 rounded-md overflow-hidden`}
                      >
                        0
                      </div>
                    </Substrate>
                  )}
                </Draggable>
              );
            }
            if (name === 'actions') {
              return (
                <Draggable draggableId={id} index={index} key={id}>
                  {(provided, snapshot) => (
                    <Substrate
                      draqRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      classes={`${snapshot.isDragging ? 'bg-gray-100' : ''}`}
                    >
                      {calcAction.map((action) => (
                        <CalcButton action={action} key={action} />
                      ))}
                    </Substrate>
                  )}
                </Draggable>
              );
            }
            if (name === 'numbers') {
              return (
                <Draggable draggableId={id} index={index} key={id}>
                  {(provided, snapshot) => (
                    <Substrate
                      draqRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      classes={`flex-wrap ${snapshot.isDragging ? 'bg-gray-100' : ''}`}
                    >
                      {calcNumAndComma.map((btn) => {
                        if (btn === '0') {
                          return <CalcButton action={btn} key={btn} classes="min-w-[152px]" />;
                        }
                        return <CalcButton action={btn} key={btn} />;
                      })}
                    </Substrate>
                  )}
                </Draggable>
              );
            }
            if (name === 'equal') {
              return (
                <Draggable draggableId={id} index={index} key={id}>
                  {(provided, snapshot) => (
                    <Substrate
                      draqRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      classes={`${snapshot.isDragging ? 'bg-gray-100' : ''}`}
                    >
                      <CalcButton action="=" classes="min-w-full" />
                    </Substrate>
                  )}
                </Draggable>
              );
            }
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Constructor;

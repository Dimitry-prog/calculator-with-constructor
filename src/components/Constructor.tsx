import React, { FC } from 'react';
import Substrate from './Substrate';
import CalcButton from './UI/CalcButton';
import { calcAction, calcNumAndComma } from '../utils/constants';
import { useAppSelector } from '../hooks/useTypedSelector';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import { getResult, setActionSign, setCurrentValue } from 'store/calcSlice';
import { IDragOrder, IEquals } from '../types/models';
import { replaceStr } from '../utils/replaceStr';
import { Draggable, Droppable } from 'react-beautiful-dnd';

type ConstructorProps = {
  isOpen: boolean;
  setFields: React.Dispatch<React.SetStateAction<IDragOrder[]>>;
  fields: IDragOrder[];
};

const Constructor: FC<ConstructorProps> = ({ isOpen, fields }) => {
  const { currentValue, calculateValue, sign } = useAppSelector((state) => state.calc);
  const dispatch = useAppDispatch();
  const outputDrag = fields.findIndex((elem) => elem.name === 'output');
  const actionsDrag = fields.findIndex((elem) => elem.name === 'actions');
  const numbersDrag = fields.findIndex((elem) => elem.name === 'numbers');
  const equalDrag = fields.findIndex((elem) => elem.name === 'equal');
  console.log(outputDrag);
  console.log('actionsDrag', actionsDrag);
  console.log('numbersDrag', numbersDrag);
  console.log('equalDrag', equalDrag);
  const handleOperationBtnClick = (sign: string): void => {
    dispatch(setActionSign(sign));
    if (calculateValue && currentValue) {
      handleEqualsBtnClick(
        Number(replaceStr(calculateValue!)),
        Number(replaceStr(currentValue!)),
        sign
      );
    }
  };

  const handleEqualsBtnClick = (a: number, b: number, sign: string) => {
    const isDivideToZero = calculateValue === '0' || currentValue === '0';
    if (isDivideToZero) {
      return dispatch(getResult('Не определено'));
    } else {
      if (sign === 'x') sign = '*';
      const operators: IEquals = {
        '+': (a: number, b: number): number => a + b,
        '-': (a: number, b: number): number => a - b,
        '*': (a: number, b: number): number => a * b,
        '/': (a: number, b: number): number => a / b,
      };
      const res = operators[sign as keyof IEquals](a, b);
      return dispatch(getResult(replaceStr(res.toString())));
    }
  };

  const handleBtnClick = (value: string): void => {
    switch (value) {
      case ',':
        currentValue.includes(',')
          ? dispatch(setCurrentValue(''))
          : dispatch(setCurrentValue(value));
        break;
      case '=':
        handleEqualsBtnClick(
          Number(replaceStr(calculateValue!)),
          Number(replaceStr(currentValue!)),
          sign
        );
        break;
      case '/':
        handleOperationBtnClick(value);
        break;
      case 'x':
        handleOperationBtnClick(value);
        break;
      case '-':
        handleOperationBtnClick(value);
        break;
      case '+':
        handleOperationBtnClick(value);
        break;
      case '0':
        currentValue === '0' ? dispatch(setCurrentValue('')) : dispatch(setCurrentValue(value));
        break;
      default:
        dispatch(setCurrentValue(value));
    }
  };

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
          <Draggable draggableId={outputDrag.toString()} index={outputDrag} key={outputDrag}>
            {(provided, snapshot) => (
              <Substrate
                draqRef={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                classes={`${snapshot.isDragging ? 'bg-gray-100' : ''}`}
              >
                <div
                  className={`${
                    currentValue.length >= 11 ? 'text-2xl' : 'text-4xl'
                  } px-2 py-1 w-full text-right font-extrabold text-black bg-gray-100 rounded-md overflow-hidden`}
                >
                  {currentValue}
                </div>
              </Substrate>
            )}
          </Draggable>

          <Draggable draggableId={actionsDrag.toString()} index={actionsDrag} key={actionsDrag}>
            {(provided, snapshot) => (
              <Substrate
                draqRef={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                classes={`${snapshot.isDragging ? 'bg-gray-100' : ''}`}
              >
                {calcAction.map((action) => (
                  <CalcButton action={action} key={action} onClick={() => handleBtnClick(action)} />
                ))}
              </Substrate>
            )}
          </Draggable>

          <Draggable draggableId={numbersDrag.toString()} index={numbersDrag} key={numbersDrag}>
            {(provided, snapshot) => (
              <Substrate
                draqRef={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                classes={`flex-wrap ${snapshot.isDragging ? 'bg-gray-100' : ''}`}
              >
                {calcNumAndComma.map((btn) => {
                  if (btn === '0') {
                    return (
                      <CalcButton
                        action={btn}
                        onClick={() => handleBtnClick(btn)}
                        key={btn}
                        classes="min-w-[152px]"
                      />
                    );
                  }
                  return <CalcButton action={btn} onClick={() => handleBtnClick(btn)} key={btn} />;
                })}
              </Substrate>
            )}
          </Draggable>

          <Draggable draggableId={equalDrag.toString()} index={equalDrag} key={equalDrag}>
            {(provided, snapshot) => (
              <Substrate
                draqRef={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                classes={`${snapshot.isDragging ? 'bg-gray-100' : ''}`}
              >
                <CalcButton action="=" classes="min-w-full" onClick={() => handleBtnClick('=')} />
              </Substrate>
            )}
          </Draggable>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Constructor;

import React, { FC } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import icon from '../images/img_icon.svg';
import { IDragOrder, IEquals } from '../types/models';
import Substrate from './Substrate';
import { calcAction, calcNumAndComma } from '../utils/constants';
import CalcButton from './UI/CalcButton';
import { useAppSelector } from '../hooks/useTypedSelector';
import { getResult, setActionSign, setCurrentValue } from '../store/calcSlice';
import { replaceStr } from '../utils/replaceStr';
import { useAppDispatch } from '../hooks/useTypedDispatch';

type CanvasProps = {
  runningFields: IDragOrder[];
};

const Canvas: FC<CanvasProps> = ({ runningFields }) => {
  const { currentValue, calculateValue, sign } = useAppSelector((state) => state.calc);
  const dispatch = useAppDispatch();

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
    <Droppable droppableId="canvas">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`w-full max-w-[243px] flex flex-col gap-2 items-center rounded-md border-2 border-dashed ${
            snapshot.isDraggingOver ? 'bg-blue-100' : ''
          } ${
            runningFields.length === 0 ? 'justify-center' : 'border-none'
          } transition-all duration-500`}
        >
          {runningFields.length === 0 && (
            <div className="flex flex-col items-center">
              <img src={icon} alt="picture" className="w-6 h-6 block mb-3" />
              <h2 className="mb-1 text-sm font-medium leading-4 text-blue-500">Перетащите сюда</h2>
              <p className="max-w-[106px] text-center text-gray-500 text-xs">
                любой элемент из левой панели
              </p>
            </div>
          )}

          {runningFields.map(({ id, name }, index) => {
            if (name === 'output') {
              return (
                <Draggable draggableId={id} index={index} key={id}>
                  {(provided, snapshot) => (
                    <Substrate
                      draqRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      classes={`${snapshot.isDragging ? 'bg-gray-100' : ''} shadow-none`}
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
                      classes={`${snapshot.isDragging ? 'bg-gray-100' : ''} shadow-none`}
                    >
                      {calcAction.map((action) => (
                        <CalcButton
                          action={action}
                          key={action}
                          onClick={() => handleBtnClick(action)}
                        />
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
                      classes={`flex-wrap ${snapshot.isDragging ? 'bg-gray-100' : ''} shadow-none`}
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
                        return (
                          <CalcButton action={btn} onClick={() => handleBtnClick(btn)} key={btn} />
                        );
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
                      classes={`${snapshot.isDragging ? 'bg-gray-100' : ''} shadow-none`}
                    >
                      <CalcButton
                        action="="
                        classes="min-w-full"
                        onClick={() => handleBtnClick('=')}
                      />
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

export default Canvas;

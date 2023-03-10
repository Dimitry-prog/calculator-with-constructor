import React, { FC } from 'react';
import Substrate from './Substrate';
import CalcButton from './UI/CalcButton';
import { calcAction, calcNumAndComma } from '../utils/constants';
import { useAppSelector } from '../hooks/useTypedSelector';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import { getResult, setActionSign, setCurrentValue } from 'store/calcSlice';
import { IEquals } from '../types/models';
import { replaceStr } from '../utils/replaceStr';

type ConstructorProps = {
  isOpen: boolean;
};

const Constructor: FC<ConstructorProps> = ({ isOpen }) => {
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
    <div className="w-full flex flex-col gap-3">
      <Substrate>
        <div className="px-2 py-1 w-full text-right text-4xl font-extrabold text-black bg-gray-100 rounded-md overflow-hidden">
          {currentValue}
        </div>
      </Substrate>

      <Substrate>
        {calcAction.map((action) => (
          <CalcButton action={action} key={action} onClick={() => handleBtnClick(action)} />
        ))}
      </Substrate>

      <Substrate classes="flex-wrap">
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

      <Substrate>
        <CalcButton action="=" classes="min-w-full" onClick={() => handleBtnClick('=')} />
      </Substrate>
    </div>
  );
};

export default Constructor;

import React, { FC } from 'react';
import Substrate from './Substrate';
import CalcButton from './UI/CalcButton';
import { calcAction, calcNumAndComma } from '../utils/constants';

type ConstructorProps = {
  isOpen: boolean;
};

const Constructor: FC<ConstructorProps> = ({ isOpen }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <Substrate>
        <input
          type="text"
          placeholder="0"
          className="px-2 py-1 w-full text-right text-4xl font-extrabold text-black bg-gray-100 rounded-md placeholder:text-black outline-none focus:bg-gray-200 transition-all duration-500"
        />
      </Substrate>

      <Substrate>
        {calcAction.map((action) => (
          <CalcButton action={action} key={action} />
        ))}
      </Substrate>

      <Substrate classes="flex-wrap">
        {calcNumAndComma.map((btn) => {
          if (btn === '0') {
            return <CalcButton action={btn} key={btn} classes="min-w-[152px]" />;
          }
          return <CalcButton action={btn} key={btn} />;
        })}
      </Substrate>

      <Substrate>
        <CalcButton action="=" classes="min-w-full" />
      </Substrate>
    </div>
  );
};

export default Constructor;

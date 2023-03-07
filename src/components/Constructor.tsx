import React, { FC } from 'react';
import Substrate from './Substrate';
import CalcButton from './UI/CalcButton';

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
        <CalcButton action="/" />
        <CalcButton action="x" />
        <CalcButton action="-" />
        <CalcButton action="+" />
      </Substrate>

      <Substrate classes="flex-wrap">
        <CalcButton action="7" />
        <CalcButton action="8" />
        <CalcButton action="9" />
        <CalcButton action="4" />
        <CalcButton action="5" />
        <CalcButton action="6" />
        <CalcButton action="1" />
        <CalcButton action="2" />
        <CalcButton action="3" />
        <CalcButton action="0" classes="min-w-[152px]" />
        <CalcButton action="," />
      </Substrate>

      <Substrate>
        <CalcButton action="=" classes="min-w-full" />
      </Substrate>
    </div>
  );
};

export default Constructor;

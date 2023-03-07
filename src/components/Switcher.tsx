import React, { FC } from 'react';
import Eye from '../icons/Eye';
import Selector from '../icons/Selector';
import SelectorActive from '../icons/SelectorActive';
import EyeActive from '../icons/EyeActive';

type SwitcherProps = {
  isRunning: boolean;
  isConstructor: boolean;
};

const Switcher: FC<SwitcherProps> = ({ isRunning, isConstructor }) => {
  return (
    <div className="flex justify-between p-px max-w-[243px] w-full rounded-md bg-gray-100">
      <button
        className={`${
          isRunning ? 'bg-white border-gray-200 ' : ''
        } flex items-center gap-2 px-3 py-2 text-gray-600 text-sm leading-[15px] font-medium rounded`}
        type="button"
      >
        {isRunning ? <EyeActive /> : <Eye />}
        Runtime
      </button>
      <button
        className={`${
          isConstructor ? 'bg-white border-gray-200' : ''
        } flex items-center gap-2 px-3 py-2 text-gray-600 text-sm leading-[15px] font-medium rounded`}
        type="button"
      >
        {isConstructor ? <SelectorActive /> : <Selector />}
        Constructor
      </button>
    </div>
  );
};

export default Switcher;

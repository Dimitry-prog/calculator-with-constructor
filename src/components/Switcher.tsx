import React, { FC } from 'react';
import Eye from '../icons/Eye';
import Selector from '../icons/Selector';
import SelectorActive from '../icons/SelectorActive';
import EyeActive from '../icons/EyeActive';
import { useAppDispatch } from '../hooks/useTypedDispatch';
import { resetCalc, toggleRunning } from '../store/calcSlice';
import { useAppSelector } from '../hooks/useTypedSelector';

const Switcher: FC = () => {
  const { isRunning } = useAppSelector((state) => state.calc);
  const dispatch = useAppDispatch();

  const handleToggleRunning = (): void => {
    dispatch(toggleRunning(!isRunning));
    dispatch(resetCalc());
  };

  return (
    <div
      onClick={handleToggleRunning}
      className="flex justify-between p-px max-w-[243px] w-full rounded-md bg-gray-100 transition-all duration-500"
    >
      <button
        className={`${
          isRunning ? 'bg-white border-gray-200 border-inherit' : ''
        } flex items-center gap-2 px-3 py-2 text-gray-600 text-sm leading-[15px] font-medium rounded border border-transparent transition-all duration-500`}
        type="button"
      >
        {isRunning ? <EyeActive /> : <Eye />}
        Runtime
      </button>
      <button
        className={`${
          !isRunning ? 'bg-white border-gray-200 border-inherit' : ''
        } flex items-center gap-2 px-3 py-2 text-gray-600 text-sm leading-[15px] font-medium rounded border border-transparent transition-all duration-500`}
        type="button"
      >
        {!isRunning ? <SelectorActive /> : <Selector />}
        Constructor
      </button>
    </div>
  );
};

export default Switcher;

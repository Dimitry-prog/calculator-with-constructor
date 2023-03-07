import React, { FC } from 'react';

type CalcButtonProps = {
  action: string;
  classes?: string;
};

const CalcButton: FC<CalcButtonProps> = ({ action, classes }) => {
  return (
    <button
      type="button"
      className={`max-w-[72px] ${classes} min-w-[52px] min-h-[48px] w-full flex items-center justify-center 
                border border-gray-200 rounded-md hover:border-blue-500 focus:bg-blue-500 focus:text-white transition-all duration-500`}
    >
      {action}
    </button>
  );
};

export default CalcButton;
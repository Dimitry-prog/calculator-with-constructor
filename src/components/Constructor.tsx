import React, { FC } from 'react';
import Substrate from './Substrate';

type ConstructorProps = {
  isOpen: boolean;
};

const Constructor: FC<ConstructorProps> = ({ isOpen }) => {
  return (
    <div className="flex flex-col gap-3">
      <Substrate>
        <input
          type="text"
          placeholder="0"
          className="px-2 py-1 text-right text-4xl font-extrabold text-black bg-gray-100 rounded-md placeholder:text-black outline-none focus:bg-gray-200 transition-all duration-300"
        />
      </Substrate>
    </div>
  );
};

export default Constructor;

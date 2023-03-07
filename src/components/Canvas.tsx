import React, { FC } from 'react';
import icon from '../images/img_icon.svg';

type CanvasProps = {
  isOpen: boolean;
};

const Canvas: FC<CanvasProps> = ({ isOpen }) => {
  return (
    <div className="flex flex-col gap-2 rounded-md border-2 border-dashed">
      <div className="flex flex-col items-center">
        <img src={icon} alt="picture" className="w-6 h-6 block mb-3" />
        <h2 className="mb-1 text-sm font-medium leading-4 text-blue-500">Перетащите сюда</h2>
        <p className="max-w-[106px] text-center text-gray-500 text-xs">
          любой элемент из левой панели
        </p>
      </div>
    </div>
  );
};

export default Canvas;

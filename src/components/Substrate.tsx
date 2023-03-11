import React, { FC, LegacyRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type SubstrateProps = {
  draqRef?: LegacyRef<HTMLDivElement> | undefined;
  children: ReactNode | JSX.Element;
  classes?: string;
};

const Substrate: FC<SubstrateProps> = ({ children, draqRef, classes, ...restProps }) => {
  return (
    <div
      {...restProps}
      ref={draqRef}
      className={twMerge(
        `min-w-[240px] w-full p-1 flex gap-2 rounded bg-white shadow-md ${classes ?? ''}`
      )}
    >
      {children}
    </div>
  );
};

export default Substrate;

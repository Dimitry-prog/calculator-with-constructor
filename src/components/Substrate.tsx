import React, { FC, ReactNode } from 'react';

type SubstrateProps = {
  children: ReactNode | JSX.Element;
  classes?: string;
};

const Substrate: FC<SubstrateProps> = ({ children, classes }) => {
  return (
    <div className={`max-w-[240px] p-1 flex gap-2 rounded bg-white shadow-md ${classes}`}>
      {children}
    </div>
  );
};

export default Substrate;

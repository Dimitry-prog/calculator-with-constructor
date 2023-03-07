import React, { FC, ReactNode } from 'react';

type SubstrateProps = {
  children: ReactNode | JSX.Element;
};

const Substrate: FC<SubstrateProps> = ({ children }) => {
  return <div className="max-w-[240px] p-1 rounded bg-white shadow-md">{children}</div>;
};

export default Substrate;

import React, { FC } from "react";

interface IPropsModalForConfirm {
  active: boolean;
  children: React.ReactChildren | React.ReactNode;
}

const ModalForConfirm: FC<IPropsModalForConfirm> = ({ active, children }) => {
  return (
    <>
      {active && (
        <div className="h-screen w-screen bg-[rgba(0,0,0,0.4)] fixed top-0 left-0 z-[1000]">
          <div className="flex justify-center items-center h-full">
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForConfirm;

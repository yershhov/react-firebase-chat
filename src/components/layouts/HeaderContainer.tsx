import React, { ReactNode } from "react";

type HeaderContainerProps = {
  children: ReactNode;
};

const HeaderContainer = (props: HeaderContainerProps) => {
  return (
    <div className="px-4 grid w-full h-[3.8rem] dark:bg-mainDark rounded-t-xl">
      {props.children}
    </div>
  );
};

export default HeaderContainer;

import React, { ReactNode } from "react";

type HeaderContainerProps = {
  children: ReactNode;
};

const HeaderContainer = (props: HeaderContainerProps) => {
  return (
    <div className="p-4 absolute top-0 w-full h-[4.4rem] dark:bg-mainDark rounded-t-xl">
      {props.children}
    </div>
  );
};

export default HeaderContainer;

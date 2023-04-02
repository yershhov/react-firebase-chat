import React, { ReactNode } from "react";

type HeaderContainerProps = {
  children: ReactNode;
};

const HeaderContainer = (props: HeaderContainerProps) => {
  return (
    <div className="relative">
      <div className="p-4 absolute w-full bottom-0 left-0 h-[4.4rem] dark:bg-deppDark">
        {props.children}
      </div>
    </div>
  );
};

export default HeaderContainer;

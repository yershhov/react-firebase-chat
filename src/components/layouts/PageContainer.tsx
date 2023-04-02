import React, { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
};

const PageContainer = (props: PageContainerProps) => {
  return <div className="mt-[4.5rem]">{props.children}</div>;
};

export default PageContainer;

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import SideBar from "../layouts/SideBar";
import { toggleSideBar } from "./appContainer.slice";

type AppContainerProps = {
  children?: ReactNode;
};

const AppContainer = (props: AppContainerProps) => {
  const sideBarIsOpen = useAppSelector(
    (state) => state.appContainer.sideBarIsOpen
  );
  return (
    <div className="h-full items-center w-full block sm:flex">
      <div className="dark:bg-raisinBlack h-full hidden sm:block w-full relative z-50"></div>
      <div className="flex max-h-screen h-full sm:h-5/6 sm-max-h-5/6">
        <div className="dark:bg-deepDark sm:rounded-xl sm:w-80 w-full h-full relative">
          <AnimatePresence>{sideBarIsOpen && <SideBar />} </AnimatePresence>
          {props.children}
        </div>
      </div>
      <div className="dark:bg-raisinBlack h-full hidden sm:block w-full relative z-50"></div>
    </div>
  );
};

export default AppContainer;
